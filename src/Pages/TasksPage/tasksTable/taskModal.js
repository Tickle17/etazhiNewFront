import React, { useEffect, useState } from "react";
import { closeEditModal } from "../../../Shared/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../Shared/Redux/Slices/authSlice";
import axios from "axios";
import extractedHandleChange from "./features/features";
import { useUpdateTaskMutation } from "../../../Shared/Redux/Slices/api";

export default function TaskModal({ task }) {
  const [responsible, setResponsible] = useState([]);
  const User = useSelector(selectUser);
  const [editedTask, setEditedTask] = useState(task);
  const [editTask, setEditTask] = useState(false);
  const dispatch = useDispatch();
  const [updateTask] = useUpdateTaskMutation();

  const handleSave = async () => {
    console.log(editedTask);

    try {
      const response = await updateTask(editedTask);
      if (response.data) {
        console.log(response.data);
        alert("Задача успешно обновлена");
        dispatch(closeEditModal());
        window.location.reload();
      }
    } catch (error) {
      alert(error);
      dispatch(closeEditModal());
    }
    dispatch(closeEditModal());
  };
  const handleEdit = () => {
    // console.log(editedTask);
    setEditTask(!editTask);
  };

  const formFieldsLeader = [
    { id: "title", label: "Заголовок", type: "text" },
    { id: "description", label: "Описание", type: "text" },
    { id: "deadLine", label: "Дата окончания", type: "date" },
  ];
  const handleChange = extractedHandleChange(
    responsible,
    editedTask,
    setEditedTask
  );

  const PostData = {
    role: User.role,
    userId: User.id,
  };
  useEffect(() => {
    try {
      axios
        .post("http://localhost:5001/auth/taskWorker", PostData)
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
  return (
    <div>
      {editTask ? (
        User.role === "Руководитель" || task.createdId === User.id ? (
          <form>
            <div>
              {formFieldsLeader.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    id={field.id}
                    type={field.type}
                    name={field.id}
                    value={editedTask[field.id]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="reg-page">
                <label htmlFor="responsible">Ответственный</label>
                <select
                  id="responsible"
                  name="responsible"
                  value={editedTask.responsibleId}
                  onChange={handleChange}
                >
                  {responsible.map((resp) => (
                    <option key={resp.id} value={resp.id}>
                      {`${resp.firstName} ${resp.secondName}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="reg-page">
                <label htmlFor="priority">Приоритет</label>
                <select
                  id="priority"
                  name="priority"
                  value={editedTask.priority}
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
                  value={editedTask.status}
                  onChange={handleChange}
                >
                  <option value="К выполнению">К выполнению</option>
                  <option value="Выполняется">Выполняется</option>
                  <option value="Выполнена">Выполнена</option>
                  <option value="Отменена">Отменена</option>
                </select>
              </div>
            </div>
          </form>
        ) : (
          <form>
            <div>{editedTask.title}</div>
            <div>{editedTask.description}</div>
            <div>{editedTask.deadLine}</div>
            <div>{editedTask.createdAt}</div>
            <div>{editedTask.updatedAt}</div>
            <div>{editedTask.status}</div>
            <div>{editedTask.createdBy}</div>
            <div>{editedTask.responsible}</div>
            <div className="reg-page">
              <label htmlFor="status">Статус</label>
              <select
                id="status"
                name="status"
                value={editedTask.status}
                onChange={handleChange}
              >
                <option value="К выполнению">К выполнению</option>
                <option value="Выполняется">Выполняется</option>
                <option value="Выполнена">Выполнена</option>
                <option value="Отменена">Отменена</option>
              </select>
            </div>
          </form>
        )
      ) : (
        <form>
          <div>
            <div>{editedTask.title}</div>
            <div>{editedTask.description}</div>
            <div>{editedTask.deadLine}</div>
            <div>{editedTask.createdAt}</div>
            <div>{editedTask.updatedAt}</div>
            <div>{editedTask.priority}</div>
            <div>{editedTask.status}</div>
            <div>{editedTask.createdBy}</div>
            <div>{editedTask.responsible}</div>
          </div>
        </form>
      )}
      <button onClick={handleEdit}>Редактировать</button>
      {/*<button onClick={dispatch(closeEditModal())}>Закрыть</button>*/}
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}
