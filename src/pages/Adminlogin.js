
import React from  'react';
import '../App.css';
import { useHistory } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
function AdminLogin(){
  const history = useHistory();
  const [username,Setusername] = React.useState("")
  const [password,Setpassword] = React.useState("")
  const Loginsubmit = (e)=>{
    e.preventDefault();
    console.log(username,password)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username,password })
    };
    fetch('https://banana-cobbler-66277.herokuapp.com/admin/login',options)
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      if(data.status){
        let user = JSON.stringify(data.user)
        localStorage.setItem('token', data.token);
        localStorage.setItem('userdetails', user);
        toast.success('Login  Successfully', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  })
        history.push("/adminpage");
      }else{
        toast.warn(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
  }
  return (
    <div className='App'>
      <h1> Admin Login</h1>
      <form onSubmit={Loginsubmit}>
        <h1>Enter Your Details</h1>
        <div >


          <label>
            UserName:
            <input
              name="username"
              type="text"
              value={username}
              onChange={e => Setusername(e.target.value)}
              required />
          </label>



          <label>
            Password:
            <input
              name="Password"
              type="Password"
              value={password}
              onChange={e => Setpassword(e.target.value)}
              required />
          </label>

          <button type="submit">Submit</button>
          <div>
            <div className="text-start">Note:
            </div>

            <div className="text-start">
              <label >  UserName :"admin"     </label>
            </div>
            <div className="text-start">
              <label>    Password  :"admin"      </label>
            </div>
          </div>
        </div>
      </form>

    </div>


  )

}
export default AdminLogin;
