import "./style.css";
import LoginPage from "../Pages/LoginPage/LoginPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  setAuthenticated,
  setUnauthenticated,
} from "../Shared/Redux/Slices/authSlice";
import TasksPage from "../Pages/TasksPage/TasksPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.getItem("token")
      ? dispatch(setAuthenticated())
      : dispatch(setUnauthenticated());
  }, []);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="App">
      {isAuthenticated ? <TasksPage></TasksPage> : <LoginPage></LoginPage>}
    </div>
  );
}

export default App;
