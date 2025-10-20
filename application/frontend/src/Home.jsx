import { useEffect, useState } from "react";
import Greeting from './Greeting';
import Hero from './Hero';
import TaskList from './TaskList';

export default function Home() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('medium');

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
       if (task.trim() === '') return;
        setTasks([
          ...tasks,
          {
            text: task,
            completed: false,
            isEditing: false,
            priority,
            category,
            dueDate,
            subtasks: [],
            notes: '',
            recurring: '',
          },
        ]);
        setTask('');
        setPriority('medium');
        setCategory('');
        setDueDate('');
    };

    const handleDeleteTask = (index) =>
        setTasks(tasks.filter((_, i) => i !== index));

    const handleToggleComplete = (index) =>
    setTasks(
        tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } :t))
    );

    const handleStartEditing = (index) =>
  setTasks(tasks.map((t, i) =>
    i === index ? { ...t, isEditing: true } : t
  ));
    
    
   const handleEditTask = (index, newText) =>
  setTasks(tasks.map((t, i) =>
    i === index ? { ...t, text: newText, isEditing: false } : t
  ));

    const handleSaveTask = (index) =>
    setTasks(
        tasks.map((t, i) => (i === index ? { ...t, isEditing: false } : t))
    );
    
    const handleEditPriority = (index, newPriority) =>
        setTasks(
        tasks.map((t, i) => (i === index ? { ...t, priority: newPriority } : t))
    );

    const handleEditCategory = (index, newCategory) =>
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, category: newCategory } : t))
    );

  const handleEditDueDate = (index, newDueDate) =>
    setTasks(tasks.map((t, i) => (
      i === index ? { ...t, dueDate: newDueDate } : t
    )));
    
    const handleAddSubtask = (taskIndex, text) => {
    if (!text.trim()) return;
    setTasks((prev) =>
      prev.map((t, i) =>
        i === taskIndex
          ? {
              ...t,
              subtasks: [...(t.subtasks || []), { text, done: false }],
            }
          : t
      )
    );
  };

  const handleToggleSubtask = (taskIndex, subtaskIndex) =>
  setTasks(prev =>
    prev.map((task, i) =>
      i === taskIndex
        ? {
            ...task,
            subtasks: task.subtasks.map((sub, j) =>
              j === subtaskIndex ? { ...sub, done: !sub.done } : sub
            ),
          }
        : task
    )
  );

  const handleEditNotes = (index, newNotes) =>
    setTasks(
        tasks.map((t, i) => (i === index ? { ...t, notes: newNotes } : t))
    ) ;

    const handleSetRecurring = (index, recurringType) =>
        setTasks(
            tasks.map ((t, i) =>
            i === index ? { ...t, recurring: recurringType} : t
        )
    );

    const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'completed'
        ? task.completed
        : filter === 'incomplete'
        ? !task.completed
        : true;

    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <main className="flex-grow max-w-3xl mx-auto px-6">
      <Hero />
      <h1 className="text-4xl font-bold mb-2">Hello Everyone</h1>
      <p className="text-lg mb-4">Welcome to Mytasks</p>
      <Greeting name="Everyone" />

      <div className="bg-white p-4 rounded-lg shadow-md my-6">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter Task"
            className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2"
          >
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="School">School</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="low">Low 🟢</option>
            <option value="medium">Medium 🟡</option>
            <option value="high">High 🔴</option>
          </select>

          <button
            onClick={handleAddTask}
            disabled={task.trim() === ''}
            className={`px-4 py-2 rounded font-semibold transition ${
              task.trim() === ''
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Add Task
          </button>
        </div>
      </div>

      <p className="mb-4">
        Total Tasks: {tasks.length} | Completed: {completedTasks} | Remaining:{' '}
        {tasks.filter((t) => !t.completed).length}
      </p>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Tasks"
        className="border border-gray-300 rounded px-3 py-1 mb-2 w-full"
      />

      <div className="mb-6 space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${
            filter === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('incomplete')}
          className={`px-3 py-1 rounded ${
            filter === 'incomplete'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          Incomplete
        </button>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-1">
          Progress: {completedTasks}/{totalTasks} tasks completed
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${Math.min(100, Math.round(progress))}%` }}
          ></div>
        </div>
      </div>

      {/* <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
        onStartEditing={handleStartEditing}
        onEdit={handleEditTask}
        onSave={handleSaveTask}
        onEditPriority={handleEditPriority}
        onEditCategory={handleEditCategory}
        onEditDueDate={handleEditDueDate}
        onAddSubtask={handleAddSubtask}
        onToggleSubtask={handleToggleSubtask}
        onEditNotes={handleEditNotes}
        onSetRecurring={handleSetRecurring}
      /> */}

      {tasks.length === 0 && (
        <p className="text-gray-500 italic mt-4">
          No tasks yet. Add one above!
        </p>
      )}
    </main>
  );
}