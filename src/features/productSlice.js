import { createSlice } from "@reduxjs/toolkit";

const initialProduct = {
  name: "",
  price: "",
  brand_id: "",
  category_id: "",
  description: "",
  short_despcription: "",
  quantity: "",
  isVisible: false,
  images: [],
  imageFiles: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProduct,
  reducers: {
    setProductName: (state, action) => {
      state.name = action.payload;
    },
    setProduct_BrandId: (state, action) => {
      state.brand_id = action.payload;
    },
    setProduct_CategoryId: (state, action) => {
      state.category_id = action.payload;
    },
    setProductPrice: (state, action) => {
      state.price = Number(action.payload);
    },
    setProductDescription: (state, action) => {
      state.description = action.payload;
    },
    setProductShortDescription: (state, action) => {
      state.short_despcription = action.payload;
    },
    setProductQuntity: (state, action) => {
      state.quantity = Number(action.payload);
    },

    setProductVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
    setProductImages: (state, action) => {
      state.images = action.payload;
    },
    setProductImageFiles: (state, action) => {
      state.imageFiles = action.payload;
    },

    resetProduct: (state) => {},
  },
});

export const {
  setProductName,
  setProductPrice,
  setProduct_BrandId,
  setProduct_CategoryId,
  setProductDescription,
  setProductShortDescription,
  setProductVisibility,
  setProductImageFiles,
  setProductImages,
  setProductQuntity,
  resetProduct,
} = productSlice.actions;

export default productSlice.reducer;
