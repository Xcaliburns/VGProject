import { useState } from "react";

import Navbar from "../Components/Navbar";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function Login() {
  //   const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    const data = { username: username, password: password };
    axios.post(`${baseURL}/users/login`, data).then((res) => {
      if(res.data.error){
        alert(res.data.error);
      }else{
        sessionStorage.setItem("accessToken",res.data);
      }
      
      //   navigate('/');
    });
  };
  return (
    <div>
      <Navbar />
      <div>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="button" onClick={Login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
