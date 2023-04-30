import React from "react";

const Dashboard = ()=>{
    return(
        <div>
            <div class="sidenav">
  <a href="/register">RegisterUser</a>
  <a href="/createtask">CreateTask</a>
  <a href="/useraction">UserAction</a>
  <a href="/checkemploye">CheckEmployes</a>
  <a href="/">Logout</a>
</div>

<div class="main">
Hi Welcome To The App .
</div>
        </div>
    )
}
export default Dashboard;