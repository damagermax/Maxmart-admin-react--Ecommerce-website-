import { configureStore } from "@reduxjs/toolkit";
import addCategoryReducer from "../features/addCategory/addCategorySlice";
import brandReducer from "../features/brandSlice";
import productReducer from "../features/productSlice";
import { categoryDatabase } from "../services/category";
import { brandDatabase } from "../services/brandDb";
import { productDatabase } from "../services/productDb";

export const store = configureStore({
  reducer: {
    brand: brandReducer,
    addCategory: addCategoryReducer,
    product: productReducer,
    [categoryDatabase.reducerPath]: categoryDatabase.reducer,
    [brandDatabase.reducerPath]: brandDatabase.reducer,
    [productDatabase.reducerPath]: brandDatabase.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      categoryDatabase.middleware,
      brandDatabase.middleware,
      productDatabase.middleware,
    ]),
});
