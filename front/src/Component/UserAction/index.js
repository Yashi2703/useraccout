import React, { useState, useEffect } from "react";
import { getAllUser,DeletUser,ActiveUser } from "../../utils/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
toast.configure()
const UserAction = () => {
  const [selectUser, setSelectUser] = useState("");
  const[values,setValues] =  useState({
    userId:""
  })
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getAllUser();
      setSelectUser(response.data);
    
    }

    fetchMyAPI();
  }, []);
  const DeleteUser = async (id) => {
    try {
      if(!window.confirm("Are you sure you want to delet!")){
        return;
      }
      const response = await DeletUser(id
      );
    
      if (response.status === false) {
        throw {
          message: response.message || "Something went wrong during delete.",
        };
      }
      let filterData = selectUser.filter((item) => item._id !== id);
      setSelectUser(filterData);
     
    } catch (err) {
      let message =
        err && err?.message
          ? err?.message
          : "Something went wrong "
      toast.error(message);
      return false;
    }
  };
  const activeUser = async (id) => {
    try {
      const response = await ActiveUser(id
      );
    
      if (response.status === false) {
        throw {
          message: response.message || "Something went wrong during active.",
        };
      }
      let filterData = selectUser.filter((item) => item._id !== id);
      setSelectUser(filterData);
     
    } catch (err) {
      let message =
        err && err?.message
          ? err?.message
          : "Something went wrong";
      toast.error(message);
      return false;
    }
  };
  return (
    <div>
      <Link to = "/dashboard">Back</Link>
      <table className="customers">
        <tr>
          <th>FirstName</th>
          <th>Email</th>
          <th>ControlDelet</th>
          <th>ControlActive</th>
        </tr>
        {selectUser?.length > 0 &&
          selectUser?.map((item, key) => {
            return (
              <tr>
                <td key={item._id}>{item.firstName}</td>
                <td>{item.email}</td>
                <td>
                  <button  onClick={(e) => {
              DeleteUser(item._id);
            }}>Delete User</button>
                </td>
                <td>
                  <label class="switch" onClick={(e)=>{activeUser(item._id)}}>
                    <input type="checkbox"  />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
            );
           
          })}
      </table>
    </div>
  );
};
export default UserAction;
