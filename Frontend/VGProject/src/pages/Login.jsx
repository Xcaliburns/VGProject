import { useState, useContext } from "react";

import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const {setAuthState} =useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    const data = { username: username, password: password };
    axios.post(`${baseURL}/users/login`, data).then((res) => {
      if (res.data.error) {
        console.log(res.data);
        alert(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data);
        setAuthState(true);
        alert(`bonjour, ${username}`);
      }

      navigate("/");
    });
  };

  return (
    <div>
      <Navbar />

      <div className="loginPage">
        <div className="formContainer">
          <label>username</label>
          <input
            className="inputUsername"
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>password</label>
          <input
            className="inputUsername"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="button" onClick={Login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
