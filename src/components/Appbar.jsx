import * as React from "react";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";

function Appbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(reset());
    dispatch(logout());
    navigate(<Login />);
    window.location.reload();
  };

  return (
    <nav className="navbar bg-body-tertiary ">
      <div className="container-fluid px-5 py-2 ">
        <div></div>
        <form className="d-flex" role="search">
          <button
            className="btn btn-outline-light fs-5 me-2 d-flex"
            type="submit"
            onClick={() => onLogout()}
          >
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Appbar;
