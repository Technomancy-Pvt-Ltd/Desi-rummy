import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import "../auth/auth.css";
import { toast } from "react-toastify";
import logo from "../../assets/desyrummy.jpg"

function Login() {
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    LoginType: "phone",
  });

  useEffect(() => {
    if (user && user.status && user?.result?.privilage === 1) {
      toast.success(user.message);
    }
    if (user && user.status === false) {
      toast.error(user.message);
    }
  
    if (user?.result?.privilage === 0) {
      toast.error("Unauthorized Access ");
    }


  }, [ isSuccess, dispatch, user]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
     
    }
  }, [isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("plz fill all details", {
        position: "top-center",
      });
    } else {
      dispatch(login(formData));
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="logohome">
          <img      
            src={logo}
            alt=""
            width={40}
            height={50}
          />
        </div>
        <div className="text-center mt-4 name">Desi Rummy</div>
        <form className="p-3 mt-3" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="email"
              id="userName"
              placeholder="Username"
              onChange={onChange}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              id="pwd"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </div>
          <button className=" mt-3 loginbtn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
