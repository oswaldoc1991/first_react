import { useEffect, useState } from 'react';
import './App.css'
import Greeting from "./Greeting";
import NavBar from './NavBar';
import Footer from'./Footer';
import Hero from './Hero';
import TaskList from './TaskList';

function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // new state for category and priority
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');

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

  // adding priority and category into the website
  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTasks([
      ...tasks,
      {
        text: task,
        completed: false,
        isEditing: false,
        priority, // adding priority
        category // adding category
      }
    ]);
    setTask('');
    setPriority('medium'); // resetting priority
    setCategory(''); // reseting category
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

      <main className='flex-grow max-w-3xl mx-auto px-4'>
        {/* hero section for the website */}
        <Hero />

        {/* Title of the website */}
        <h1 className="text-4xl font-bold my-4">Hello Everyone</h1>
        <p className="text-lg mb-4">This is my first custom component</p>
        <Greeting name="Everyone"/>

        <div className="my-4">
          <input 
            type='text'
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='Enter Task'
            className="border border-grey-300 rounded px-3 py-1"
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />

           {/* drop down box for what type of task and priority */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="School">School</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
          Add Task
          </button>
      </div>

        {/* tally button */}
        <p>
          Total Tasks: {tasks.length} |
          Completed Tasks: {tasks.filter(t => t.completed).length} |
          Remaining : {tasks.filter(t => !t.completed).length}
        </p>

        {/* improved version of handling tasks */}
        <TaskList 
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onStartEditing={handleStartEditing}
          onEdit={handleEditTask}
          onSave={handleSaveTask}
        />

        {tasks.length === 0 && (
          <p className='text-gray-500 italic mt-4'>No Tasks yet. Add one above!</p>
        )}
      </main>

      {/* Footer for the website */}
      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  );      
};

export default App;