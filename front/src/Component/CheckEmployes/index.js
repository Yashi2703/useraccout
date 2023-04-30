import React, { useState, useEffect } from "react";
import { getAllUser, checkAssignTAsk, SearchUser } from "../../utils/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
toast.configure();
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const CheckEmployes = () => {
  let subtitle;
  const [selectUser, setSelectUser] = useState("");
  const [values, setValues] = useState({
    firstName: ""
  })
  const [storeData, setStoreData] = useState("")
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const[search,setSearch] = useState("")
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getAllUser();
      setSelectUser(response.data);
    }
    fetchMyAPI();
  }, []);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = async (id) => {
    try {
      const response = await checkAssignTAsk(id
      );
      console.log(response, "====response===")
      if (response.status === false) {
        throw {
          message: response.message || "Something went wrong during active.",
        };
      }
      else {
        setStoreData(response.data)
        openModal()
        setIsOpen(true)
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
  };


  const handleSearch = async(values) => {
   let response =  await SearchUser(values.firstName);
   setSearch(response)
   return response;
  }
  console.log(search)
  return (
    <div>
      <input type="text" placeholder="Search" value={values.firstName}
        onChange={(e) => {
          setValues({ ...values, firstName: e.target.value });
        }} />
      <button onClick = {()=>handleSearch(values)}>Search</button>
      {search.data?.map((item,index)=>{
        return(
          <ul>
          <li>{item.firstName}</li>
        </ul>
        )
      })}
     
      <Link to="/dashboard">Back</Link>
      <h1>Show user and assign task</h1>

      <div>
        <table className="customers">
          <tr>
            <th>
              UserName
            </th>
            <th>Email</th>
            <th>Assign task</th>
          </tr>
          {selectUser?.length > 0 &&
            selectUser.map((item, key) => {
              return (
                <tr>
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  <td><button onClick={(e) => { handleSubmit(item._id) }}>Assign Task</button></td>
                </tr>
              )
            })}

        </table>
      </div>
      {modalIsOpen ? <div>  <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Assign Task</h2>
        <button onClick={closeModal}>close</button>
        {storeData.length > 0 && storeData.map((item) => {
          return (
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

          )
        })}
      </Modal></div> : ""}
    </div>
  )
}
export default CheckEmployes;