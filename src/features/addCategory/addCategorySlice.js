import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  sku: "",
  shortDescription: "",
  imageUrl: "",
  isVisible: false,
  imageFile: null,
};

export const addCategorySlice = createSlice({
  name: "addCategory",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSKU: (state, action) => {
      state.sku = action.payload;
    },
    setShortDescription: (state, action) => {
      state.shortDescription = action.payload;
    },
    setimageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setimageFile: (state, action) => {
      state.imageFile = action.payload;
    },
    setVisibility: (state, action) => {
      state.isVisible = action.payload;
    },

    // the new data to be saved
    setNewCatagory: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetCategory: (state) => {
      state.name = "";
      state.sku = "";
      state.shortDescription = "";
      state.imageUrl = "";
      state.isVisible = false;
      state.imageFile = null;
    },
  },
});

export const {
  setName,
  setSKU,
  setShortDescription,
  setimageUrl,
  setVisibility,
  setimageFile,
  setNewCatagory,
  resetCategory,
} = addCategorySlice.actions;

export default addCategorySlice.reducer;
