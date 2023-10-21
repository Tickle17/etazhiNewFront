import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../Shared/Redux/Slices/authSlice";
import Modal from "../../../Shared/modal/modal";
import {
  closeEditModal,
  openEditModal,
  selectIsEditModalOpen,
} from "../../../Shared/modal/modalSlice";
import TaskModal from "./taskModal";

function TasksTable() {
  // techConsts
  const dispatch = useDispatch();
  const [gridApi, setGridApi] = useState(null);
  const User = useSelector(selectUser);

  // modalFeatures
  const isModalOpen = useSelector(selectIsEditModalOpen);
  const [contentModal, setContentModal] = useState(<></>);
  const openContentModal = (data) => {
    setContentModal(<TaskModal task={data}></TaskModal>);
    dispatch(openEditModal());
  };
  const closeContentModal = () => {
    setContentModal(<></>);
    dispatch(closeEditModal());
  };
  // tableData
  const headers = {
    Authorization: `${localStorage.getItem("token")}`,
  };
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (User.role === "Руководитель") {
      axios
        .get(`http://localhost:5001/tasks/leader/${User.id}`, { headers })
        .then((response) => {
          setRowData(response.data);
        });
    } else
      axios
        .get(`http://localhost:5001/tasks/user/${User.id}`, { headers })
        .then((response) => {
          setRowData(response.data);
        });
  }, []);

  const columnDefs = [
    { headerName: "Заголовок", field: "title" },
    { headerName: "Приоритет", field: "priority" },
    { headerName: "Дата окончания", field: "deadLine" },
    { headerName: "Ответственный", field: "responsible" },
    { headerName: "Статус", field: "status" },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "400px", maxWidth: "800px", margin: "0 auto" }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={(params) => setGridApi(params.api)}
        onCellClicked={(event) => {
          if (event.colDef.field) {
            openContentModal(event.data);
          }
        }}
      ></AgGridReact>
      {isModalOpen && (
        <Modal
          contentModal={contentModal}
          closeContentModal={closeContentModal}
        ></Modal>
      )}
    </div>
  );
}

export default TasksTable;
