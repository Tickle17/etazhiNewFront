import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Shared/Redux/Slices/authSlice";

export default function ModalTasksPage() {
  const User = useSelector(selectUser);
  const [responsible, setResponsible] = useState([]);

  useEffect(() => {
    try {
      axios
        .post("http://localhost:5001/auth/getLeaderUsers", leaderId.id)
        .then((response) => {
          const respData = response.data.map((item) => item);
          setResponsible(respData);
        });
    } catch (error) {
      console.error("Ошибка при выполнении GET-запроса:", error);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Средний",
    status: "К выполнению",
    createdBy: `${leaderId.firstName} ${leaderId.secondName}`,
    deadLine: "",
    responsible: "",
  });

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
      <div className="reg-page">
        <label htmlFor="responsible">Выберите сотрудника</label>
        <select
          id="responsible"
          name="responsible"
          value={taskData.responsible}
          onChange={handleChange}
        >
          <option value="">Выберите сотрудника</option>
          {responsible.map((responsible) => (
            <option key={responsible.id} value={responsible.id}>
              {`${responsible.firstName} ${responsible.secondName}`}
            </option>
          ))}
        </select>
      </div>

      <button>Отправить</button>
    </div>
  );
}
