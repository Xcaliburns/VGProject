import { Link, useNavigate } from "react-router-dom";
import { useContext,  useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Navbar() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

   const { authState, setAuthState } = useContext(AuthContext);

 

  useEffect(() => {
    axios
      .get(`${baseURL}/users/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({
            ...authState,
            status: false,
          });
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      });
  }, []);

  const Logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    alert(`you successfully logged out`);
    navigate("/");
  };

  console.log(authState);

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/createpost">Post</Link>

      {!authState.status ? (
        <>
          <Link to="/login">login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={Logout}>logout</button>
      )}
      { <h1>{`${authState.username}`}</h1> }
    </div>
  );
}

export default Navbar;
