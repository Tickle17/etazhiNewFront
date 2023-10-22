import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
  selectIsModalOpen,
} from "../../Shared/modal/modalSlice";
import Modal from "../../Shared/modal/modal";
import RegPage from "./modalContentRegistration/regPage";
import { useLoginMutation } from "../../Shared/Redux/Slices/api";
import { setAuthenticated, setUser } from "../../Shared/Redux/Slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const [contentModal, setContentModal] = useState(<></>);
  const [login] = useLoginMutation();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const openContentModal = () => {
    setContentModal(<RegPage></RegPage>);
    dispatch(openModal());
  };

  const closeContentModal = () => {
    setContentModal(<></>);
    dispatch(closeModal());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const [errorMessage, setErrorMessage] = useState({
    errorStatus: false,
    errorText: "",
  });

  const handleLogin = async () => {
    try {
      const response = await login({ loginData });
      if (response.token && response.user) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user.id);
        dispatch(setAuthenticated());
        dispatch(setUser(response.data.user));
      } else {
        // Ошибка: сообщение об ошибке исчезнет через 0.5 секунды
        setErrorMessage({
          errorStatus: true,
          errorText: response.error.data.message,
        });
        setTimeout(() => {
          setErrorMessage({
            errorStatus: false,
            errorText: "",
          });
        }, 1000);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="username"
        value={loginData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
      />
      <button onClick={openContentModal}>Регистрация</button>
      {isModalOpen && (
        <Modal
          contentModal={contentModal}
          closeContentModal={closeContentModal}
        ></Modal>
      )}
      <button onClick={handleLogin}>Войти</button>
      {errorMessage.errorStatus && (
        <div className="error-message">{errorMessage.errorText}</div>
      )}
    </div>
  );
}
