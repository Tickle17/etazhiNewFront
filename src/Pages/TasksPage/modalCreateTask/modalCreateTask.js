import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../Shared/Redux/Slices/authSlice";
import { useCreateTaskMutation } from "../../../Shared/Redux/Slices/api";
import { featuresModalCreateTask } from "./features/features";

export default function ModalCreateTask() {
  //  techConsts
  const dispatch = useDispatch();
  const User = useSelector(selectUser);
  const [createTask] = useCreateTaskMutation();
  // getUsers
  const [responsible, setResponsible] = useState([]);
  const PostData = {
    role: User.role,
    userId: User.id,
  };
  useEffect(() => {
    try {
      axios
        .post("https://dornetshop.ru/auth/taskWorker", PostData)
        .then((response) => {
          const respData = response.data.map((item) => item);
          if (PostData.role === "Руководитель") {
            const respWorkers = respData[0];
            const respWorkersArray = respWorkers.map((item) => item);
            const respLeader = respData[1];
            respWorkersArray.push(respLeader);
            setResponsible(respWorkersArray);
          } else setResponsible(respData);
        });
    } catch (error) {
      console.error("Ошибка при выполнении Post-запроса:", error);
    }
  }, []);

  const [taskData, setTaskData] = useState(
    {
      title: "",
      description: "",
      priority: "Средний",
      status: "К выполнению",
      deadLine: "",
      responsible: "",
      responsibleId: "",
      createdBy: `${User.firstName} ${User.secondName}`,
      userRole: User.role,
      userId: User.id,
      responsibleRole: "",
    },
    []
  );

  const handleChange = featuresModalCreateTask.extractedHandleChange(
    responsible,
    taskData,
    setTaskData
  );

  const handleSubmit = featuresModalCreateTask.extractedHandleSubmit(
    createTask,
    taskData,
    dispatch
  );

  return (
    <div>
      <div className="reg-page">
        <label htmlFor="title">Заголовок</label>
        <input
          id="title"
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
        />
      </div>

      <div className="reg-page">
        <label htmlFor="description">Описание</label>
        <input
          id="description"
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
        />
      </div>

      <div className="reg-page">
        <label htmlFor="priority">Приоритет</label>
        <select
          id="priority"
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
        >
          <option value="Высокий">Высокий</option>
          <option value="Средний">Средний</option>
          <option value="Низкий">Низкий</option>
        </select>
      </div>

      <div className="reg-page">
        <label htmlFor="status">Статус</label>
        <select
          id="status"
          name="status"
          value={taskData.status}
          onChange={handleChange}
        >
          <option value="К выполнению">К выполнению</option>
          <option value="Выполняется">Выполняется</option>
          <option value="Выполнена">Выполнена</option>
          <option value="Отменена">Отменена</option>
        </select>
      </div>

      <div className="reg-page">
        <label htmlFor="deadLine">Крайний срок</label>
        <input
          id="deadLine"
          type="date"
          name="deadLine"
          value={taskData.deadLine}
          onChange={handleChange}
        />
      </div>
      {/*не выбирает сотрудника, решить */}
      <div className="reg-page">
        <label htmlFor="responsible">Выберите сотрудника</label>
        <select
          id="responsible"
          name="responsible"
          value={taskData.responsibleId}
          onChange={handleChange}
        >
          <option value="">Выберите сотрудника</option>

          {responsible.map((resp) => (
            <option key={resp.id} value={resp.id}>
              {`${resp.firstName} ${resp.secondName}`}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
}
