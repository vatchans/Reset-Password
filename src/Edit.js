import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
function Edit() {
 
let [dob,setdate]=useState('')
let [age,setage]=useState("")
let [contact,setContact]=useState('')
let [Data,setdata]=useState([])
let navigate=useNavigate()
let getData=async(e)=>{
    // e.preventDefult();
    let email= await localStorage.getItem("Email");
    try{
      let res=await axios.get(`http://localhost:8000/users/info/${email}`)
      if(res.status===200){
        let date= res.data.Dob.split('')
        let result= date.splice(0,10).join('')
       setdata(res.data)
       setage(res.data.age)
       setdate(result)
       setContact(res.data.contact)
       console.log(Data)
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
// 
let handlesubmit=async(e)=>{
    e.preventDefault();
    let email= await localStorage.getItem("Email"); 
   try{
    
     let res=await axios.post(`http://localhost:8000/users/addtional/${email}`,{
        dob,
        age,
        contact
    })
    if(res.status===201){
        toast.success('Sucessfully updated')
        navigate('/Dashboard')
    }
    else if(res.status===400){
        toast.error('error occured')
    }
}
    catch(error){
      console.log(error.data)
    }
}
 return<>
 <div className='g'>
 <div style={{display: 'flex', justifyContent: 'center',}}>
 <form className='mt-5' style={{"width":"500px",backgroundColor:"white",padding:"20px",borderRadius:"10px"}}>
    <div className='text-center'>
        <h3>
         Edit information
        </h3>
    </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Contact Number</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"value={contact} onChange={(e)=>{setContact(e.target.value)}}/>
    <div id="emailHelp" class="form-text"></div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Dob</label>
    <input type="Date" class="form-control" id="exampleInputPassword1"value={dob} onChange={(e)=>{setdate(e.target.value)}}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Age</label>
    <input type="text" class="form-control" id="exampleInputPassword1"value={age}onChange={(e)=>{setage(e.target.value)}}/>
    
  </div>
  
  <button type="submit" class="btn btn-primary"onClick={(e)=>handlesubmit(e)}>Edit</button>
</form>
</div>
</div>
 </>
}

export default Edit