import React from 'react';

   const Board = ({task,index,taskList,setTaskList}) => {
    const handleDelete =()=>{
        let removeIndex=taskList.indexOf(task);
        taskList.splice(removeIndex,1);
        setTaskList((currentTasks=> currentTasks.filter(todo => index===removeIndex)))
    };
  return (
    <>
    <div className='task-card'>
    <p>{task}</p>
    <button  className='delete-btn'onClick={handleDelete}>
        Delete
    </button>
    </div>
    </>
  );
};
export default Board;
