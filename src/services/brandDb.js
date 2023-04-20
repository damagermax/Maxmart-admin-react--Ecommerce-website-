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

export const brandDatabase = createApi({
  reducerPath: "brandDatabase",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    saveBrand: builder.mutation({
      async queryFn(data) {
        try {
          const categoryImageRef = ref(storage, `brands/${data?.id}.jpg`);
          await uploadBytes(categoryImageRef, data?.logoUrl);

          const downloadURL = await getDownloadURL(categoryImageRef);
          await setDoc(doc(db, "brands", data?.id), {
            ...data,
            logoUrl: downloadURL,
          });

          return { data: "ok" };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),

    getBrands: builder.query({
      async queryFn() {
        try {
          let categories = [];

          const querySnapshot = await getDocs(collection(db, "brands"));
          querySnapshot.forEach((doc) => {
            categories.push(doc.data());
          });

          return { data: categories };
        } catch (error) {
          return { error };
        }
      },
    }),

    getBrand: builder.query({
      async queryFn(id) {
        try {
          const docSnap = await getDoc(doc(db, "brands", id));
          if (!docSnap.exists()) {
            return;
          }

          return { data: docSnap.data() };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),

    updateBrand: builder.mutation({
      async queryFn(newBrand) {
        try {
          if (isObject(newBrand.logoUrl)) {
            const brandLogoRef = ref(storage, `brands/${newBrand?.id}.jpg`);
            await uploadBytes(brandLogoRef, newBrand?.logoUrl);

            const downloadURL = await getDownloadURL(brandLogoRef);
            await updateDoc(doc(db, "brands", newBrand?.id), {
              ...newBrand,
              logoUrl: downloadURL,
            });

            return { satus: "fulfied" };
          }

          await updateDoc(doc(db, "brands", newBrand?.id), newBrand);

          return { satus: "fulfied" };
        } catch (error) {
          return { error };
        }
      },
    }),

    deleteBrand: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "brands", id));

          const categoryImageRef = ref(storage, `brands/${id}.jpg`);
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
  useSaveBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
  useGetBrandQuery,
  useDeleteBrandMutation,
} = brandDatabase;
