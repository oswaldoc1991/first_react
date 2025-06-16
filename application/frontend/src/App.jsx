import { useEffect, useState } from 'react';
import './App.css'
import Greeting from "./Greeting";
import NavBar from './NavBar';
import Footer from'./Footer';
import Hero from './Hero';
import TaskList from './TaskList';
import { Routes, Route } from 'react-router-dom';
import About from './About'
import Login from './Login'
import GetStarted from './GetStarted';
import MyTasks from './MyTasks';

function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // adding due dates 
  const [dueDate, setDueDate] = useState('');

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
        category, // adding category
        dueDate // adding due dates
      }
    ]);
    setTask('');
    setPriority('medium'); // resetting priority
    setCategory(''); // reseting category
    setDueDate('');
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

// editing priority
  const handleEditPriority = (index, newPriority) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, priority: newPriority} : t));
  };

// handling any editing category
  const handleEditCategory = (index, newCategory) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, category: newCategory} : t));
  };

  // handling any and new due dates
  const handleDueDate = (index, newDueDate) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, dueDate: newDueDate} : t));
  }; 

  const filteredTasks = tasks.filter((task) => {
          const matchesFilter =
            filter === 'completed' ? task.completed :
            filter === 'incomplete' ? !task.completed :
            true;
          const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());

          return matchesFilter && matchesSearch;
        });

  return (
    <div className="bg-white text-black min-h-screen">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <main className='flex-grow max-w-2xl mx-auto px-4'>
            {/* top page => the welcome page */}
              <Hero />
               <h1 className="text-4xl font-bold my-4">Hello Everyone</h1>
               <p className="text-lg mb-4">Wlecome to Mytasks</p>
               <Greeting name="Everyone" />

              <div className="my-4 flex flex-wrap gap-2 items-center">
                <input 
                type='text'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder='Enter Task'
                className="border border-gray-300 rounded px-3 py-1 mr-2"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <input 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-2"
                />

                {/* drop down box for what type of task and priority */}
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  >
                    <option value="">Select Category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="School">School</option>
                  </select>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                <button
                  onClick={handleAddTask}
                  disabled={task.trim() === ''}
                  className={`px-3 py-1 rounded transition ${task.trim() === '' ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600' }`}
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

              {/* search bar */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Tasks"
                className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
              />

              {/* filter */}
              <div className="my-4 space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded ${
                    filter === 'all' ? 'bg-blue-700' : 'bg-blue-500'
                  } text-white hover:bg-blue-600`}
                >
                  All
                </button>

                <button
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-1 rounded ${
                    filter === 'completed' ? 'bg-green-700' : 'bg-green-500'
                  } text-white hover:bg-green-600`}
                >
                  Completed
                </button>

                <button
                  onClick={() => setFilter('incomplete')}
                  className={`px-3 py-1 rounded ${
                    filter === 'incomplete' ? 'bg-yellow-600' : 'bg-yellow-500'
                  } text-white hover:bg-yellow-600`}
                >
                  Incomplete
                </button>
              </div>

              {/* improved version of handling tasks */}
              <TaskList 
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
                onStartEditing={handleStartEditing}
                onEdit={handleEditTask}
                onSave={handleSaveTask}
                onEditPriority={handleEditPriority}
                onEditCategory={handleEditCategory}
                onEditDueDate={handleDueDate}
              />

              {tasks.length === 0 && (
                <p className='text-gray-500 italic mt-4'>No Tasks yet. Add one above!</p>
              )}
            </main>
          }
        /> 

        {/* routes from other pages */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/mytasks" element={<MyTasks />} />
      </Routes>
      <Footer />
    </div>
  );
      
};

export default App;