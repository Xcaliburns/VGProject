import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Navbar() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
     axios
      .get(`${baseURL}/users/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/createpost">Post</Link>

      {!authState && (
        <>
          <Link to="/login">login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
