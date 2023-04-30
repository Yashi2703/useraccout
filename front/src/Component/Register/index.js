import React,{useState} from "react";
import { signUpAction } from "../../utils/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link } from "react-router-dom";
toast.configure();
const Register = ()=>{
  const navigate =  useNavigate();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      });
      const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      });
      function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
          return true;
        }
        return false;
      }

      const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            if (
                values.firstName === "" ||
                values.lastName === "" ||
                values.email === "" ||
                values.password === "" ||
                !ValidateEmail(values.email) 
              ) {
                setErrors({
                  ...errors,
                  firstName:
                    values.firstName === ""
                      ? "Please enter FirstName"
                      : errors.firstName,
                  lastName:
                    values.lastName === "" ? "Please enter LastName " : errors.lastName,
                  email:
                    values.email === ""
                      ? "Please enter email"
                      : !ValidateEmail(values.email)
                      ? "please enter valid email"
                      : errors?.email,
                  password:
                    values.password === ""
                      ? "Please enter password"
                      : errors?.password,
                });
                return false;
              }
              let response = await signUpAction({ payload: values });
              if (response.status === false) {
                throw {
                  message: response.message || "Something went during Registration",
                };
              }
              if (response.status === true) {
                toast.success("User Register Successfully");
                setValues(" ")
                return;
              }
        }catch(err){
            let message =
        err && err.message ? err.message : "Something went wrong during login";
      toast.error(message);
      return false;
        }
      }
    return(
        <div>
             <Link to="/dashboard">Back</Link>
            <form action="action_page.php" method="post">
            <h1>Register</h1>

        <div className="container">
          <label>FirstName</label>
          <input
            type="text"
            placeholder="Enter firstName"
            value={values.firstName}
            onChange={(e) => {
              setErrors({
                ...errors,
                firstName: null,
              });
              setValues({ ...values, firstName: e.target.value });
            }}
          />
            {errors.firstName && <span className="error">{errors.firstName}</span>}<br/>
          <label>LastName</label>
          <input
            type="text"
            placeholder="Enter lastName"
            value={values.lastName}
            onChange={(e) => {
              setErrors({
                ...errors,
                lastName: null,
              });
              setValues({ ...values, lastName: e.target.value });
            }}
          />{" "}
          {errors.lastName && <span className="error">{errors.lastName}</span>}<br/>
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter email"
            value={values.email}
            onChange={(e) => {
              setErrors({
                ...errors,
                email: null,
              });
              setValues({ ...values, email: e.target.value });
            }}
          />{" "}
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
           {errors.password && <span className="error">{errors.password}</span>}<br/>
        </div>

        <button onClick={handleSubmit}>Register</button>
        <div class="container signin">
    <p>Already have an account? <a href="/">Sign in</a>.</p>
  </div>
      </form>
     
        </div>
    )
}
export default Register;