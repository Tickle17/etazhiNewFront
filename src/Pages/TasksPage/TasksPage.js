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
  selectIsEditModalOpen,
  selectIsModalOpen,
} from "../../Shared/modal/modalSlice";
import ModalCreateTask from "./modalCreateTask/modalCreateTask";
import TasksTable from "./tasksTable/tasksTable";

export default function TasksPage() {
  const dispatch = useDispatch();
  const [contentModal, setContentModal] = useState(<></>);

  function DelLocalStor() {
    localStorage.clear();
    dispatch(setUnauthenticated());
    dispatch(clearUser());
  }
  const openContentModal = () => {
    setContentModal(<ModalCreateTask></ModalCreateTask>);
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
      <div style={{ margin: "0 auto", position: "relative", zIndex: 0 }}>
        <TasksTable></TasksTable>
      </div>
    </div>
  );
}
