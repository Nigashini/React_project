import React from 'react'
import { useState } from 'react'

 const Input = ({tasklist,setTaskList}) => {
    const[input,setInput]=useState("");
    const handleAddTask = (e) =>{
        e.preventDefault();
        setTaskList([...tasklist,input]);
        setInput("");
    };
  return (
    <>
    <form>
        <input
        className="Add"
          type="text"
          placeholder="Add a Task"
          value={input}
          onChange={(e)=> setInput(e.target.value)}/>
          <button onClick={handleAddTask}>Add</button>
    </form>
    </>
  );
};
export default Input
