import React, { useState, useEffect } from "react";
import "./style.css";
import {
  setAuthenticated,
  setUser,
} from "../../../Shared/Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { closeModal } from "../../../Shared/modal/modalSlice";

export default function RegPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    role: "Руководитель", // Значение "Руководитель" по умолчанию
    selectedLeader: "", // Выбранный руководитель
    username: "",
    password: "",
  });
  const [leaders, setLeaders] = useState([]); // Список руководителей из базы данных

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5001/auth/getLeaderWorkers")
        .then((response) => {
          const leaderData = response.data.map((item) => item);
          setLeaders(leaderData);
        });
    } catch (error) {
      console.error("Ошибка при выполнении GET-запроса:", error);
    }
  }, []);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/auth/register", {
        formData,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user.id);
        dispatch(setAuthenticated());
        dispatch(closeModal());
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      console.error("Ошибка при выполнении POST-запроса:", error);
    }
  };

  return (
    <div>
      <div className="reg-page">
        <label htmlFor="firstName">Ваше имя</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="reg-page">
        <label htmlFor="secondName">Ваша фамилия</label>
        <input
          id="secondName"
          type="text"
          name="secondName"
          value={formData.secondName}
          onChange={handleChange}
        />
      </div>

      <div className="reg-page">
        <label htmlFor="role">Роль</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="Руководитель">Руководитель</option>
          <option value="Подчиненный">Подчиненный</option>
        </select>
      </div>

      {formData.role === "Подчиненный" && (
        <div className="reg-page">
          <label htmlFor="selectedLeader">Выберите руководителя</label>
          <select
            id="selectedLeader"
            name="selectedLeader"
            value={formData.selectedLeader}
            onChange={handleChange}
          >
            <option value="">Выберите руководителя</option>
            {leaders.map((leader) => (
              <option key={leader.id} value={leader.id}>
                {`${leader.firstName} ${leader.secondName}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="reg-page">
        <label htmlFor="username">Логин</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className="reg-page">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
}
