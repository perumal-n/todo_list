import AddTask from './addTask'
import './App.css'
import ShowTask from './showTask'
import { useState } from 'react'

function App() {
  const [statee, setSatus] = useState(true)
  const [fromValue, setFromValue] = useState({
    title:"",
    description:"",
})
console.log(fromValue)
  return (
    <>
    <div className='todo-app-wrapper'>
        <AddTask setFromValue={setFromValue} fromValue={fromValue} setSatus={setSatus} statee={statee}/>
        <ShowTask fromValue={fromValue} setFromValue = {setFromValue} statee={statee} setSatus={setSatus}/>
    </div>
    </>
  )
}

export default App
