import React,{useEffect,useState} from "react";
import { checkAssignTAsk } from "../../utils/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
toast.configure()
const UserDashboard = ()=>{
    const navigate =  useNavigate();
    const[storeData,setStoreData] = useState("")
    const id =  localStorage.getItem("userId")
    useEffect(() => {
        async function fetchMyAPI() {
            try {
                const response = await checkAssignTAsk(id
                );
                console.log(response)
                if (response.status === false) {
                  throw {
                    message: response.message || "Something went wrong during active.",
                  };
                }
               else{
                  setStoreData(response.data)
                  return;
               }
              } catch (err) {
                let message =
                  err && err?.message
                    ? err?.message
                    : "Something went wrong";
                toast.error(message);
                return false;
              }
        }
        fetchMyAPI();
    }, []);
   const handleLogout =  async(req,res)=>{
        localStorage.removeItem("token")
        navigate("/")
    }
    return(
        <div>
            <table className="customers">
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
                {storeData.length>0 && storeData.map((item)=>{
                    return(
                        <tr>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                        </tr>
                    )
                })}
            </table>
            <button onClick={handleLogout} >Logout</button>
        </div>
    )
}
export default UserDashboard;