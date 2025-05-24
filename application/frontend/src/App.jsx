import { useEffect, useState } from 'react';
import './App.css'
import Greeting from "./Greeting";

function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // loading the task from the local storage when the app stores
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    console.log("loaded from local storage:", storedTasks);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // saving task to te local storage after tasks are changed
  useEffect(() => {
    console.log("Saving to local storage:", tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // adding new task into the website
  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, {text: task, completed: false }]);
    setTask('');
  };

  // deleting the task from the website
  const handleDeleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete))
  };

  const handleToggleComplete = (indexToToggle) => {
    setTasks(tasks.map((t, index) =>
      index === indexToToggle ? { ...t, completed: !t.completed} : t
    ));
  };

  return (
    <div>
      <h1>Hello Everyone!!!!</h1>
      <p>This is my first custom component</p>
      <Greeting name="Oswaldo" />

      <div style={{ margin: '20px'}}>
        <input 
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='Enter Task'
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((t, index) =>
          <li 
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: t.completed? 'line-through' : 'none',
              color: t.completed ? 'grey' : 'black',
            }}
          >
            {t.text}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
            <button onClick={() => handleToggleComplete(index)}>{t.completed ? 'Undo': 'Done'}</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default App