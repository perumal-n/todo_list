import './showTask.css'
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiFeatherFill } from "react-icons/pi";

export default function TasksComp(data){
    // console.log(data,"task")


    const deleted = (datas) =>{
        fetch(`http://localhost:3300/todo/${datas}`, {
            method: 'DELETE',
        }).then(res => {
            if (!res.ok) {
                throw new Error("Failed to delete");
            }
            return; // no need to parse anything
        }).then(task => {
            // Do something with deleted task
            data.setFromValue({
                title:"",
                description:""
            })
            data.setSatus(!data.statee)
        }).catch(error => {
            // handle error
            console.log(error)
        })
    }




    //update

    
    const updated = (datas) =>{
        data.setFromValue(datas)
    }

   
    

    return(
        <>
        <div className="Tasks-box">
            <div className='tasks-top-line'>
                <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                <h1 className='title'>{data.itemsset.title}</h1>
                 
                <div>
                <MdModeEditOutline className='edit-icon' onClick={()=>updated(data.itemsset)}/> <RiDeleteBin6Line className='dlt-icon' onClick={()=>deleted(data.itemsset._id)} />
                </div>
                </div>
            </div>
            <div className='tasks-bottom-line'>
                <p><PiFeatherFill />{data.itemsset.description}</p>
            </div>
        </div>
        </>
    )
}