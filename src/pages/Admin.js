import '../App.css'
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
function Admin(){
  const [userlist,Setuserlist] = React.useState([])
  const [userheader,Setuserheader] = React.useState([])
  const [name,Setname] = React.useState(new Date().toISOString())


  const history = useHistory();
  useEffect(() => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('userdetails');
    const headers = [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Message", key: "message" },
      { label: "createdAt", key: "createdAt" }

    ];


    if(!token){
      history.push("/AdminLogin");
    }
    else{
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' +token }
      };
      fetch('https://banana-cobbler-66277.herokuapp.com/user/find?deleted=false',options)
      .then(response => response.json())
      .then(data =>{
        console.log(data)
        if(data.status){

          Setuserheader(headers)
          Setuserlist(data.data)
        }
      })
    }
  });
  const LogoutCLICK = ((e)=>{
  localStorage.clear();
  toast.success('Logout  Successfully', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
})
  history.push("/AdminLogin");
})
 return (
    <div className='App'>
      <div >
        <div>
          <CSVLink data={userlist} headers={userheader} filename={name+'.csv'} >
            Convert_CSV
          </CSVLink>
        </div >
      <div  className="but">
        <button onClick={LogoutCLICK}>Logout</button>

      </div >
        {userlist.map(user => (
          <div className="card">
            <div className="text-align">

              <label>Name: </label><span>{user.name}</span>
            </div>

            <div className="text-align">

              <label>Email: </label><span>{user.email}</span>
            </div>
            <div className="text-align">

              <label>Message: </label><span>{user.message}</span>
            </div>


          </div >
        ))}
      </div >


    </div>

  )

}
export default Admin;
