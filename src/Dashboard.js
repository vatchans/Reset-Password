import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
function Dashboard() {
  let [dob,setdate]=useState('')
let [age,setage]=useState("")

let [name,setusername]=useState('')
let [contact,setContact]=useState('')
  let [Data,setdata]=useState([])
  let getData=async(e)=>{
    // e.preventDefault();
    let email= await localStorage.getItem("Email");
    try{
      let res=await axios.get(`http://localhost:8000/info/${email}`)
      if(res.status===200){
        let date=res.data.Dob.split('')
        let result=date.splice(0,10).join('')
       setdata(res.data)
       setage(res.data.age)
       setdate(result)
       setusername(res.data.Username)
       setContact(res.data.contact)
      }}
      catch(error){
        if(error.status===500){
         console.log(error)
      }
    }
  }
  useEffect(()=>{
   getData()
  },[])
  return <>
  <div className='g'>
  <div style={{display: 'flex', justifyContent: 'center',}}>
  <div className="card mt-5" style={{width: "28rem"}}>
<img src="60111.jpg" width={150} style={{padding:"20px",borderRadius:"50%"}} alt='user'></img><span><Link to='/Edit'><i class="fa-solid fa-user-pen"></i></Link></span>
  <div className="card-body" style={{padding:"40px"}}>
    <p className="card-text">Name:  {name}</p>
    <p className="card-text">Contact no: {contact}</p>
    <p className="card-text">Age: {age}
    </p>
    <p className="card-text">Dob:  {dob}</p> 
  </div>
</div>
</div>
</div>
  </>
}
export default Dashboard
