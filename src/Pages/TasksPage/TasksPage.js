import React, { useState } from "react";
import {
  clearUser,
  selectUser,
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
  const User = useSelector(selectUser);

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

  const [selectedFilter, setSelectedFilter] = useState("all"); // Изначально выбрана опция 'all'
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value); // Обновляем выбранную опцию
  };
  const isModalOpen = useSelector(selectIsModalOpen);
  return (
    <div>
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
      <label htmlFor="filterSelect">Выберите фильтр: </label>
      <select
        id="filterSelect"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="all">Все задачи</option>
        <option value="today">На сегодня</option>
        <option value="week">На неделю</option>
        <option value="future">На будущее</option>
        {User.role === "Руководитель" && (
          <option value="admin">По сотрудникам</option>
        )}
      </select>
      <div style={{ margin: "0 auto", position: "relative", zIndex: 0 }}>
        <TasksTable selectedFilter={selectedFilter}></TasksTable>
      </div>
    </div>
  );
}
