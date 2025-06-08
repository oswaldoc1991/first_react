import { useEffect, useState } from 'react';
import './App.css'
import Greeting from "./Greeting";
import NavBar from './NavBar';
import Footer from'./Footer';
import Hero from './Hero';

function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

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
    <div className="bg-white text-black min-h-screen">

      {/* NavBar for website */}
      <NavBar /> 
      
      <Hero />

      {/* Title of the website */}
      <h1 className="text-4xl font-bold my-4">Hello Everyone</h1>
      <p className="text-lg mb-4">This is my first custom component</p>
      <Greeting name="Oswaldo Cabrera"/>

      <div className="my-4">
        <input 
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='Enter Task'
          className="border border-grey-300 rounded px-3 py-1 mr-2"
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        />

        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
        Add Task
        </button>
    </div>

      {/* tally button */}
      <p>
        Total Task: {tasks.length} |
        Completed: {tasks.filter(t => t.completed).length}
        Remaining: {tasks.filter(t => !t.completed).length}
      </p>
      
      {/* whats going to be seen in the app line 87 to line 122 */}
      <ul className='space-y-2'>
        {tasks.map((t, index) => (
          <li
            key={index}
            className={`flex item-center gap-2 ${
              t.completed ? 'line-through text-gray-400' : ''
            } flex item-center gap-2 p-2 border-b border-gray-300`}
          >
            {t.isEditing ? (
              <>
                <input
                  type='text'
                  value={t.text}
                  onChange={(e) => handleEditTask(index, e.target.value)}
                  className='border border-gray-300 rounded px-2 py-1'
                />
                <button onClick={() => handleSaveTask(index)} className='bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500 transition'>Save</button>
              </>
            ) : (
              <>
                {t.text}
                <button onClick={() => handleDeleteTask(index)} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition'>Delete</button>
                <button onClick={() => handleToggleComplete(index)} className='bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition'>{t.completed ? 'Undo' : 'Done'}</button>
                <button onClick={() => handleStartEditing(index)} className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition'>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      
      {/* Footer for the website */}
      <Footer />
    </div>
  );      
};

export default App;