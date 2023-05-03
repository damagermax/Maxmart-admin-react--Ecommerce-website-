import { configureStore } from "@reduxjs/toolkit";
import addCategoryReducer from "../features/addCategory/addCategorySlice";
import brandReducer from "../features/brandSlice";
import productReducer from "../features/productSlice";
import { categoryDatabase } from "../services/category";
import { brandDatabase } from "../services/brandDb";
import { productDatabase } from "../services/productDb";

export const store = configureStore({
  reducer: {
    product: productReducer,
    brand: brandReducer,
    addCategory: addCategoryReducer,

    [categoryDatabase.reducerPath]: categoryDatabase.reducer,
    [brandDatabase.reducerPath]: brandDatabase.reducer,
    [productDatabase.reducerPath]: productDatabase.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      categoryDatabase.middleware,
      brandDatabase.middleware,
      productDatabase.middleware,
    ]),
});
