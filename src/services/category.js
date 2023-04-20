import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
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
} from "firebase/storage";
import isObject from "lodash/isObject";

export const categoryDatabase = createApi({
  reducerPath: "categoryDatabase",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    saveCategory: builder.mutation({
      async queryFn(data) {
        try {
          const categoryImageRef = ref(storage, `categories/${data?.id}.jpg`);
          await uploadBytes(categoryImageRef, data?.imageUrl);

          const downloadURL = await getDownloadURL(categoryImageRef);
          await setDoc(doc(db, "categories", data?.id), {
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

    getCategories: builder.query({
      async queryFn() {
        try {
          let categories = [];

          const querySnapshot = await getDocs(collection(db, "categories"));
          querySnapshot.forEach((doc) => {
            categories.push(doc.data());
          });

          return { data: categories };
        } catch (error) {
          return { error };
        }
      },
    }),

    getCategory: builder.query({
      async queryFn(id) {
        try {
          const docSnap = await getDoc(doc(db, "categories", id));
          if (docSnap.exists()) {
          }
          return { data: docSnap.data() };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),

    updateCategory: builder.mutation({
      async queryFn(newCategory) {
        try {
          if (isObject(newCategory.imageUrl)) {
            const brandLogoRef = ref(
              storage,
              `categories/${newCategory?.id}.jpg`
            );
            await uploadBytes(brandLogoRef, newCategory?.imageUrl);

            const downloadURL = await getDownloadURL(brandLogoRef);
            await updateDoc(doc(db, "categories", newCategory?.id), {
              ...newCategory,
              imageUrl: downloadURL,
            });

            return { satus: "fulfied" };
          }

          await updateDoc(doc(db, "categories", newCategory?.id), newCategory);

          return { satus: "fulfied" };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),

    deleteCategory: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "categories", id));

          const categoryImageRef = ref(storage, `categories/${id}.jpg`);
          await deleteObject(categoryImageRef);

          console.log("deleted ========== success", id);
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
  useSaveCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = categoryDatabase;
