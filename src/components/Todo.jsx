import React, { useEffect, useState } from 'react'
import Items from './Items'

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState('')

    useEffect(() => {
        let data = localStorage.getItem("todoTasks");
        if(data){
            setTasks(JSON.parse(data));
        }
    },[])
    

    const addTask = ()=>{
        let id = 0;
        if(tasks.length == 0){
            id = 11;
        }else{
            id = tasks[tasks.length-1].id + 2;
        }
        if(inputTask.trim() != ''){
            let newtasks = [...tasks,{task:inputTask,id}];
            localStorage.setItem("todoTasks", JSON.stringify(newtasks));
            setTasks(newtasks);
            setInputTask('')
        }
    }

    const deleteTask = (id)=>{
        let leftTasks = tasks.filter((task)=>{
            return task.id != id;
        });
        localStorage.setItem("todoTasks", JSON.stringify(leftTasks));
        setTasks(leftTasks);
    }

    const updateTask = (newtask,id)=>{
        const updated = tasks.map((task)=>{
            return task.id == id ? {task:newtask,id}:task;
        });

       if(newtask.trim()){
        localStorage.setItem("todoTasks", JSON.stringify(updated));
        setTasks(updated);
       }else{
        deleteTask(id);
       }
    }

    const deleteAll = ()=>{
        setTasks([])
        localStorage.setItem("todoTasks", "[]");
    }


  return (
    <>
        <div className='w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500 py-10 px-4'>
            <div className='w-full max-w-[500px] bg-gradient-to-r from-slate-900 to-slate-700 m-auto text-white rounded'>
            <h1 className='text-center text-white font-bold text-xl pt-3 underline'>Todo List</h1>
            <div className='flex flex-col px-5'>
                <div className='flex flex-col justify-center items-center mt-5 gap-3'>
                {tasks.map((tasks)=>{
                    return (
                        <Items key={tasks.id} task={tasks} deleteTass={deleteTask} update={updateTask}/>
                    )
                })}
                </div>
                <div className='py-5 relative'>
                    <input type='text' className='w-full bg-transparent outline-none text-white border-2 rounded-sm py-2 px-3 border-violet-600' placeholder='Add something to your list' value={inputTask} onChange={(e)=>setInputTask(e.target.value)}/>
                    <button className='text-white bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 px-3 absolute right-0' onClick={addTask}>Add</button>
                </div>
                <button className=' bg-white text-black px-2 py-1 mb-3 rounded m-auto text-sm' onClick={deleteAll}>Delete List</button>
               
            </div>
            </div>
        </div>
    </>
  )
}

export default Todo