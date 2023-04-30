import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from "react-router-dom"
import Login from './Component/Login';
import Dashboard from "./Component/Dashboard";
import './App.css';
import Register from './Component/Register';
import CreateTask from './Component/CreateTask';
import UserAction from './Component/UserAction';
import CheckEmployes from './Component/CheckEmployes';
import UserDashboard from './Component/UserDashboard';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Login/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/createtask" element = {<CreateTask/>}/>
        <Route path = "/useraction" element = {<UserAction/>}/>
        <Route path = "/checkemploye" element = {<CheckEmployes/>}/>
        <Route path='/userdashboard' element = {<UserDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
