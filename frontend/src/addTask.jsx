import { useState } from 'react'
import './addTask.css'

export default function AddTask(props){

   const {setFromValue,fromValue,statee,setSatus} = props
    

   const handlesubmit = (event) =>{
    event.preventDefault();
    // console.log(fromValue)
    fetch('http://localhost:3300/todo', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body:JSON.stringify(fromValue)
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(tasks => {
        // Do something with the list of tasks
        alert("Added successfully");
        setFromValue({
            title:"",
            description:"",
        })
        setSatus(!statee)
      }).catch(error => {
        // handle error
        console.log(error)
      })

      const indiaTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        timeStyle: "medium",
        dateStyle: "medium",
      });
      console.log(indiaTime)
   }

 const up = (event) => {
  event.preventDefault();

  console.log(fromValue); // What you're sending

  fetch(`http://localhost:3300/todo/${fromValue._id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(fromValue)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Failed to Update: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (res.status === 204 || !contentType || !contentType.includes("application/json")) {
      return null;
    }
    return res.json();
  })
  .then(task => {
    console.log("Updated task:", task || fromValue);
  })
  .catch(error => {
    console.error("Update error:", error);
  });
};

   

    return(
        <>
        <div className="right-main-div">
            <h1 className='right-title'>To-Do List</h1>
            <form className="adding-task-box" >
              {/* <textarea placeholder="Name a task..." name="newTask" type="text"></textarea> */}
              <h1 className='title'>Title</h1>
              <input placeholder='give a Title' name='title' type='text' onChange={(e)=> setFromValue({...fromValue, title:e.target.value})} value={fromValue.title}/>
              <h1 className='description'>Description</h1>
              <textarea placeholder="Add your Task!  Eg. walk the dog." onChange={(e)=> setFromValue({...fromValue, description:e.target.value})} value={fromValue.description}>
              </textarea>
              {fromValue._id === undefined ? <button className='add-task-btn' onClick={(e)=>handlesubmit(e)}>Add to the list</button> : <button className='add-task-btn' onClick={(e)=>up(e)}>Update</button>}
              
            </form>
            
        </div>
        </>
    )
   
}