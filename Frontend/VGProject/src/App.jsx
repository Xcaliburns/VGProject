import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./helpers/AuthContext";


import "./App.css";

function App() {

 const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });



  return (
    <>
    <AuthContext.Provider value={{authState,setAuthState}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="createpost" element={<CreatePost />}></Route>
        <Route path="post/:id" element={<Post />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="Register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
    </>
  );
}

export default App;
