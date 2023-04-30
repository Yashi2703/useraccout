import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAction } from "../../utils/action";
import {useNavigate} from "react-router-dom";
toast.configure();
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (values.email === "" || values.password === "") {
        setErrors({
          ...errors,
          email: values.email === "" ? "Please enter email" : errors?.email,
          password:
            values.password === "" ? "Please enter password" : errors?.password,
        });
        return false;
      }
      let response = await loginAction({ payload: values });
        console.log(response)
      if (response.status === false) {
        throw {
          message: response.message || "Something went wrong during login.",
        };
      } 
       if(response?.data.userType == "manager"){
        toast.success("Login Successfully")
         localStorage.setItem("userId",response.data?._id)
           localStorage.setItem("token",response.data?.token)
           navigate("/dashboard")
       }
       else if(response?.data.userType == "user"){
        toast.success("Login Successfully")
         localStorage.setItem("userId",response.data?._id)
           localStorage.setItem("token",response.data?.token)
         navigate("/userdashboard")
       }
    } catch (err) {
      let message =
        err && err.message ? err.message : "Something went wrong during login";
      toast.error(message);
      return false;
    }
  };
  return (
    <div>
      <form action="action_page.php" method="post">
        <div className="container">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            value={values.email}
            onChange={(e) => {
              setErrors({
                ...errors,
                email: null,
              });
              setValues({ ...values, email: e.target.value });
            }}
          />
          {errors.email && <span className="error">{errors.email}</span>}<br/>
          <label>Password</label>
          <input
            type="text"
            placeholder="Enter Password"
            value={values.password}
            onChange={(e) => {
              setErrors({
                ...errors,
                password: null,
              });
              setValues({ ...values, password: e.target.value });
            }}
          />{" "}
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};
export default Login;
