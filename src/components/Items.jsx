import React, { useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

const Items = ({task,deleteTass,update}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newtask, setNewTask] = useState(task.task);

  return (
    <div className='w-full flex justify-center items-center gap-3'>
        <input type='text' className={`outline-none rounded bg-gradient-to-r from-fuchsia-600 to-purple-600 p-2 w-full ${isEdit ? 'border-2 border-pink-300': ''}`} value={newtask} readOnly={!isEdit} onChange={(e)=>setNewTask(e.target.value)}/>
        <FaRegTrashCan className='text-xl cursor-pointer' onClick={()=>{deleteTass(task.id)}}/>

        {!isEdit ?  <FaEdit className='text-xl cursor-pointer' onClick={()=>setIsEdit(true)}/> : <FaRegSave className='text-xl cursor-pointer' onClick={()=>{setIsEdit(false);update(newtask,task.id)}}/>}

        {/* <FaEdit className='text-xl cursor-pointer' onClick={()=>setIsEdit(true)}/>
        <FaRegSave className='text-xl cursor-pointer' onClick={()=>setIsEdit(false)}/> */}
    </div>
  )
}

export default Items