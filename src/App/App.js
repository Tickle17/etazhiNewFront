import "./style.css";
import LoginPage from "../Pages/LoginPage/LoginPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  setAuthenticated,
  setUnauthenticated,
  setUser,
} from "../Shared/Redux/Slices/authSlice";
import TasksPage from "../Pages/TasksPage/TasksPage";
import { useAuthenticationQuery } from "../Shared/Redux/Slices/api";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const usedId = localStorage.getItem("id");
  const { data, error, isLoading } = useAuthenticationQuery(usedId);
  const dispatch = useDispatch();

  const b = 30; // - new branch code
  const newVariableC = 20; // - new code

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (data) {
        const reLogin = data.user;
        dispatch(setUser(reLogin));
        dispatch(setAuthenticated());
      } else {
        dispatch(setUnauthenticated());
      }
    }
  }, [data, usedId]);

  return (
    <div className="App">
      {isLoading ? (
        <p>Загрузка...</p>
      ) : isAuthenticated ? (
        <TasksPage />
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
