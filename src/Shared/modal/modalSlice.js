import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    isModalOpen: false,
    isEditModalOpen: false,
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
    openEditModal: (state) => {
      state.isEditModalOpen = true;
      document.body.classList.add("no-scroll");
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      document.body.classList.remove("no-scroll");
    },
  },
});

export const { openModal, closeModal, openEditModal, closeEditModal } =
  modalSlice.actions;
export const selectIsModalOpen = (state) => state.modalSlice.isModalOpen;
export const selectIsEditModalOpen = (state) =>
  state.modalSlice.isEditModalOpen;
export default modalSlice.reducer;
