import { useEffect, useState } from 'react';
import './App.css'
import Greeting from "./Greeting";

function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // loading the task from the local storage when the app stores
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    // console.log("loaded from local storage:", storedTasks);
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

  const handleStartEditing = (index) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, isEditing: true } : t));
  };

  const handleEditTask = (index, newText) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, text: newText } : t));
  };

  const handleSaveTask = (index) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, isEditing: false } : t));
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''} style={{
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#000',
      minHeight: '100vh',
      padding: '20px',
    }}>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>
      
      <h1>Hello Everyone!!!!</h1>
      <p>This is my first custom component</p>
      <Greeting name="Oswaldo" />

      <div style={{margin: '20px'}}>
        <input
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTask();
            }
          }}
          placeholder='Enter Task'
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* tally button */}
      <p>
        Total Task: {tasks.length} |
        Completed: {tasks.filter(t => t.completed).length} |
        Remaining: {tasks.filter(t => !t.completed).length}
      </p>
      
      {/* whats going to be seen in the app line 87 to line 122 */}
      <ul>
        {tasks.map((t, index) => (
          <li
            key={index}
            className={`task-item ${t.completed ? 'completed' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: t.completed ? 'line-through' : 'none',
              // color: t.completed ? 'grey' : 'black',
            }}
          >
            {t.isEditing ? (
              <>
                <input
                  type='text'
                  value={t.text}
                  onChange={(e) => handleEditTask(index, e.target.value)}
                />
                <button onClick={() => handleSaveTask(index)}>Save</button>
              </>
            ) : (
              <>
                {t.text}
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
                <button onClick={() => handleToggleComplete(index)}>{t.completed ? 'Undo' : 'Done'}</button>
                <button onClick={() => handleStartEditing(index)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );      
};

export default App