import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "./firebaseCofig";
import {
  uploadBytes,
  getDownloadURL,
  ref,
  deleteObject,
  listAll,
} from "firebase/storage";

export const productDatabase = createApi({
  reducerPath: "productDatabase",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    saveProduct: builder.mutation({
      async queryFn(data) {
        try {
          const imagePromises = Array.from(data?.images, async (image) => {
            const imageName = image?.name + "_" + nanoid(4);

            const categoryImageRef = ref(
              storage,
              `products/${data?.id}/${imageName}`
            );
            await uploadBytes(categoryImageRef, image);
            const downloadURL = await getDownloadURL(categoryImageRef);
            return downloadURL;
          });
          const imageUrls = await Promise.all(imagePromises);

          await setDoc(doc(db, "products", data?.id), {
            ...data,
            images: imageUrls,
          });

          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
    }),

    getProducts: builder.query({
      async queryFn() {
        try {
          let categories = [];

          const querySnapshot = await getDocs(collection(db, "products"));
          querySnapshot.forEach((doc) => {
            categories.push(doc.data());
          });

          return { data: categories };
        } catch (error) {
          return { error };
        }
      },
    }),

    getProduct: builder.query({
      async queryFn(id) {
        try {
          const docSnap = await getDoc(doc(db, "products", id));
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }

          return { data: docSnap.data() };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),

    updateProduct: builder.mutation({
      async quueryFn(id, newDate) {
        try {
          await updateDoc(doc(db, "products", id), newDate);

          return { satus: "fulfied" };
        } catch (error) {
          return { error };
        }
      },
    }),

    deleteProduct: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "products", id));

          const productImageRef = ref(storage, `products/${id}/`);
          const files = await listAll(productImageRef);

          await Promise.all(
            files.items.map(async (fileRef) => {
              await deleteObject(fileRef);
            })
          );

          return { satus: "fulfied" };
        } catch (error) {
          console.log(error);
          return error;
        }
      },
    }),
  }),
});

export const {
  useDeleteProductMutation,
  useSaveProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductQuery,
} = productDatabase;
