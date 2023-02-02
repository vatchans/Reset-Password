import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
function Additional_info() {
let [dob,setdate]=useState('')
// let [age,setage]=useState('')
let [contact,setContact]=useState('')
let [yr,setyr]=useState('')
console.log(dob)
let navigate=useNavigate()
let handlesubmit=async(e)=>{
    e.preventDefault();
    let email= await localStorage.getItem("Email");

   try{
    
     let res=await axios.post(`https://reset-password-oydo.onrender.com/addtional/${email}`,{
        dob,
        age,
        contact
    })
    if(res.status===200){
      toast.success(res.data.msg)
      navigate('/login')
    }
}
    catch(error){

    }
 
}
let date=new Date(dob)
let cal=Date.now() - date.getTime()
let age_difference=new Date(cal)
let year=age_difference.getUTCFullYear()
let age=Math.abs(year-1970)
console.log(age)
 return<>
 <div className='g'>
 <div style={{display: 'flex', justifyContent: 'center',}}>
 <form className='mt-5' style={{"width":"500px",backgroundColor:"white",padding:"20px",borderRadius:"10px"}}>
    <div className='text-center'>
        <h3>
         Additional information
        </h3>
    </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Contact Number</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setContact(e.target.value)}}/>
    <div id="emailHelp" class="form-text"></div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Dob</label>
    <input type="Date" class="form-control" id="exampleInputPassword1" onChange={(e)=>{setdate(e.target.value)}}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Age</label>
    <input type="text" class="form-control" id="exampleInputPassword1" value={age} />
    
  </div>
  
  <button type="submit" class="btn btn-primary"onClick={(e)=>handlesubmit(e)}>Submit</button>
</form>
</div>
</div>
 </>
}

export default Additional_info
