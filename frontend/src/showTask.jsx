import './showTask.css';
import TasksComp from './tasksComp';
import { BsBookmarkStarFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiFeatherFill } from "react-icons/pi";
import { useEffect, useState } from 'react';

export default function ShowTask(props){

  const {fromValue,setFromValue,statee,setSatus,time} = props

  console.log(statee)

  const [showdata, setData] = useState([])
    useEffect(()=>{
      fetch('http://localhost:3300/todo', {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(tasks => {
        // Do something with the list of tasks
        setData(tasks.reverse())
      }).catch(error => {
        // handle error
        console.log(error)
      })
    },[statee])

    

    // console.log(showdata)


    


    return(
        <>
        <div className="left-main-div">
            <h1>Recent Tasks</h1>
            <div className='left-content-box'>

              {showdata.length!==0 && showdata.map((item,i)=>(
                <>
                  <TasksComp itemsset = {item} fromValue={fromValue} setFromValue={setFromValue} setSatus={setSatus} statee={statee} />
                </>
              ))}
                
            </div>
        </div>
        </>
    )
   
}