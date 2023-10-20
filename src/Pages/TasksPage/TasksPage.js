import React, { useState } from "react";
import {
  clearUser,
  setUnauthenticated,
} from "../../Shared/Redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../Shared/modal/modal";
import {
  closeModal,
  openModal,
  selectIsModalOpen,
} from "../../Shared/modal/modalSlice";
import ModalTasksContent from "./modalTasksContent/modalTasksContent";

export default function CasesPage() {
  const dispatch = useDispatch();
  const [contentModal, setContentModal] = useState(<></>);

  function DelLocalStor() {
    localStorage.clear();
    dispatch(setUnauthenticated());
    dispatch(clearUser());
  }
  const openContentModal = () => {
    setContentModal(<ModalTasksContent></ModalTasksContent>);
    dispatch(openModal());
  };
  const closeContentModal = () => {
    setContentModal(<></>);
    dispatch(closeModal());
  };

  const isModalOpen = useSelector(selectIsModalOpen);
  return (
    <div>
      <div>Зашел</div>
      <button onClick={DelLocalStor}>Выйти</button>
      <div>
        <button onClick={openContentModal}>Создать задачу</button>
        {isModalOpen && (
          <Modal
            contentModal={contentModal}
            closeContentModal={closeContentModal}
          ></Modal>
        )}
      </div>
    </div>
  );
}
