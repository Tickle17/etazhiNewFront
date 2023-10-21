import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
      document.body.classList.add("no-scroll");
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      document.body.classList.remove("no-scroll");
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectIsModalOpen = (state) => state.modalSlice.isModalOpen;
export default modalSlice.reducer;
