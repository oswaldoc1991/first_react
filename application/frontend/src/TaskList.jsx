function TaskList({ tasks, onDelete, onToggleComplete, onStartEditing, onEdit, onSave }) {
  return (
    <ul className="space-y-2">
      {tasks.map((t, index) => (
        <li
          key={index}
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 border-b border-gray-300 ${
            t.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            {t.isEditing ? (
              <>
                <input
                  type="text"
                  value={t.text}
                  onChange={(e) => onEdit(index, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </>
            ) : (
              <>
                <span>{t.text}</span>

                {t.category && (
                  <span className="text-sm italic text-blue-500">[{t.category}]</span>
                )}

                {t.priority && (
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      t.priority === 'High'
                        ? 'bg-red-200 text-red-800'
                        : t.priority === 'Medium'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {t.priority}
                  </span>
                )}
              </>
            )}
          </div>

          <div className="flex gap-2">
            {t.isEditing ? (
              <button
                onClick={() => onSave(index)}
                className="bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500 transition"
              >
                Save
              </button>
            ) : (
              <>
                <button
                  onClick={() => onDelete(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => onToggleComplete(index)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                >
                  {t.completed ? 'Undo' : 'Done'}
                </button>
                <button
                  onClick={() => onStartEditing(index)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
