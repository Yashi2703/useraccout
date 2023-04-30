import React, { useEffect, useState } from "react";
import { createtaskAction, getAllUser } from "../../utils/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
toast.configure();
const CreateTask = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    userId: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const [selectUser, setSelectUser] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (values.title === "" || values.description === "") {
        setErrors({
          ...errors,
          title: values.title === "" ? "Please enter title" : errors?.title,
          password:
            values.description === ""
              ? "Please enter description"
              : errors?.description,
        });
        return false;
      }
      let response = await createtaskAction({ payload: values });

      if (response.status === false) {
        throw {
          message: response.message || "Something went wrong during login.",
        };
      } else {
        toast.success("Assign Task successfully");
        return;
      }
    } catch (err) {
      let message =
        err && err.message ? err.message : "Something went wrong during login";
      toast.error(message);
      return false;
    }
  };
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getAllUser();
      setSelectUser(response.data);
    }

    fetchMyAPI();
  }, []);
  return (
    <div>
      <Link to="/dashboard">Back</Link>
      <form action="action_page.php" method="post">
        <div className="container">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={values.title}
            onChange={(e) => {
              setErrors({
                ...errors,
                title: null,
              });
              setValues({ ...values, title: e.target.value });
            }}
          />
          {errors.title && <span className="error">{errors.title}</span>}
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            value={values.description}
            onChange={(e) => {
              setErrors({
                ...errors,
                description: null,
              });
              setValues({ ...values, description: e.target.value });
            }}
          />{" "}
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
          <label for="cars">Choose a user to assign the task</label>
          <select
            name="cars"
            id="cars"
            // value={values.userId}
            onChange={(e) => {
              setErrors({
                ...errors,
                userId: null,
              });
              setValues({ ...values, userId: e.target.value });
            }}
          >
            <option value="volvo">selectUser</option>
            {selectUser?.length > 0 &&
              selectUser?.map((Item) => {
                return <option value={Item._id}> {Item.email} </option>;
              })}
          </select>
          {errors.userId && <span className="error">{errors.userId}</span>}
        </div>

        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
};
export default CreateTask;
