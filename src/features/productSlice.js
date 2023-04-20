import { createSlice } from "@reduxjs/toolkit";

const initialProduct = {
  name: "",
  price: "",
  brand_id: "",
  category_id: "",
  description: "",
  short_despcription: "",
  quantity: 0,
  isVisible: false,
  images: [],
  imageFiles: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProduct,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setBrandId: (state, action) => {
      state.brand_id = action.payload;
    },
    setCategoryId: (state, action) => {
      state.category_id = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setShortDescription: (state, action) => {
      state.short_despcription = action.payload;
    },
    setQuntity: (state, action) => {
      state.quantity = action.payload;
    },

    setVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setImageFiles: (state, action) => {
      state.imageFiles = action.payload;
    },

    reset: (state) => {
      return {};
    },
  },
});

export const {
  setName,
  setPrice,
  setBrandId,
  setCategoryId,
  setDescription,
  setShortDescription,
  setVisibility,
  setImageFiles,
  setImages,
  setQuntity,
  reset,
} = productSlice.actions;

export default productSlice.reducer;
