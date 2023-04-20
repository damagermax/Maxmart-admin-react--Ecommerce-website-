import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "./firebaseCofig";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

export const productDatabase = createApi({
  reducerPath: "productDatabase",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    saveProduct: builder.mutation({
      async queryFn(data) {
        try {
          const categoryImageRef = ref(storage, `products/${data?.id}.jpg`);
          await uploadBytes(categoryImageRef, data?.imageUrl);

          const downloadURL = await getDownloadURL(categoryImageRef);
          await setDoc(doc(db, "products", data?.id), {
            ...data,
            imageUrl: downloadURL,
          });

          return { data: "ok" };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),

    getProducts: builder.query({
      async queryFn() {
        try {
          let categories = [];

          const querySnapshot = await getDocs(collection(db, "product"));
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
          const docSnap = await getDoc(doc(db, "product", id));
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
          await updateDoc(doc(db, "product", id), newDate);

          return { satus: "fulfied" };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useSaveProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductQuery,
} = productDatabase;
