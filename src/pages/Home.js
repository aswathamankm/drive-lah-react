import React from 'react';
import '../App.css'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


function Home(){
  const [name,Setname] = React.useState("")

  const [email,Setemail] = React.useState("")

  const [message,Setmessage] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({name,email,message})
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name,email,message })
    };
    fetch('https://banana-cobbler-66277.herokuapp.com/user/contact/create',options)
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      if(data.status){

        toast.success('Created Successfully', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
        Setname("")
        Setemail("")
        Setmessage("")

      }
      else{
        if(data.message === "E11000 duplicate key error collection: drive-lah.users index: email_1 dup key: { email: " + '"' + email +'"'+" }"){

          data.message = "Email Already Registered"

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
        else{
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
      }
    });
  }
  return (
    <div className='App'>
      <h1>  Customer Contact</h1>
      <form onSubmit={handleSubmit}>
        <h1>Enter Your Details</h1>
        <div >

          <label>
            Name:
            <input
              name="name"
              type="text"
              value={name}
              onChange={e => Setname(e.target.value)}
              required />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={email}
              onChange={e => Setemail(e.target.value)}
              required />
          </label>

          <label>
            Message:
            <input
              name="message"
              type="textarea"
              value={message}
              onChange={e => Setmessage(e.target.value)}
              required />
          </label>

          <button type="submit">Submit</button>
        </div>
      </form>

    </div>

  )

}
export default Home;
