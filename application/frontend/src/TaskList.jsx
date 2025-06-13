function TaskList({ tasks, onDelete, onToggleComplete, onStartEditing, onEdit, onSave }) {

  const filteredTask = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incompleted') return !task.completed;
    return true;
  });

  return (
    <ul className="space-y-2 mt-4">
      {tasks.map((t, index) => (
        <li key={index} className={`flex justify-between items-center p-2 border-b border-gray-300 ${ t.completed ? `line-through text-gray-400` : ``}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            {t.isEditing ? (
              <>
                <input type="text" value={t.text} onChange={(e) => onEdit(index, e.target.value)} />
                <button onClick={() => onSave(index)} className="bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500 transition">
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="font-medium">{t.text}</span>
                <div className="flex items-center gap-2 mt-1 sm:mt-0">
                  <span className="text-sm italic text-gray-500">[{t.category || 'Uncategorized'}]</span>
                  <span
                    className="text-sm text-gray-700 capitalize"
                  >
                    {t.priority}
                  </span>
                </div>
              </>
            )}
          </div>

          {!t.isEditing && (
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button onClick={() => onDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
                Delete
              </button>
              <button onClick={() => onToggleComplete(index)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
                {t.completed ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => onStartEditing(index)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TaskList;