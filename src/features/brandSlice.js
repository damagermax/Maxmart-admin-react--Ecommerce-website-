import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  logoUrl: "",
  isVisible: false,
  logoFile: null,
  isValidated: false,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrandName: (state, action) => {
      state.name = action.payload;
    },
    setBrandVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
    setBrandLogoFile: (state, action) => {
      state.logoFile = action.payload;
    },
    setBrandLogoUrl: (state, action) => {
      state.logoUrl = action.payload;
    },
    validdateFields: (state) => {
      state.logoFile != null && state.logoUrl != null && state.name != null
        ? (state.isValidated = true)
        : (state.isValidated = false);
    },
    reset: (state) => {
      state.isVisible = false;
      state.logoUrl = "";
      state.logoFile = null;
      state.name = "";
    },
    setToBeUpdatedBrand: (sate, action) => {
      return { ...sate, ...action.payload };
    },
  },
});

export default brandSlice.reducer;
export const {
  setBrandName,
  setBrandVisibility,
  setBrandLogoFile,
  setBrandLogoUrl,
  setToBeUpdatedBrand,
  reset,
  validdateFields,
} = brandSlice.actions;
