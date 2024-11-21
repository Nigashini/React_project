import Input from './component/Input';
import Board from './component/Board';
import { useState } from 'react';


function App() {
  const[taskList,setTaskList]=useState([]);

  return (
    <div className='todo'>
    <h1>To-Do-Board</h1>

    <div className='input-section'>
    <Input tasklist={taskList} setTaskList={setTaskList}/>
    </div>
    <div className='task-section'>
      {taskList.map((task,index)=>(
        <Board
        key={index}
        index={index}
        task={task}
        taskList={taskList}
        setTaskList={setTaskList}
        />
      ))}
    </div>
    </div>
  );
}

export default App;
