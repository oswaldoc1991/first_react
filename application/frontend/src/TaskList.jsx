function TaskList({ tasks, onDelete, onToggleComplete, onStartEditing, onEdit, onSave, onEditPriority, onEditCategory, onEditDueDate}) {
  return (
    <ul className="space-y-2 mt-4">
      {tasks.map((t, index) => (
        <li key={index} className={`bg-white rounded shadow =-4 border border-gray-200 flex flex ${ t.completed ? `line-through text-gray-400` : ``}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            {t.isEditing ? (
              <>
              {/* task text */}
                <input
                 type="text" 
                  value={t.text} 
                  onChange={(e) => onEdit(index, e.target.value)} 
                  className="border px-2 py-1 rounded mb-1"
                 />

                 {/* due date */}
                 <input 
                  type="date"
                  value={t.dueDate || ''}
                  onChange={(e) => onEditDueDate(index, e.target.value)}
                  className="border px-2 py-1 rounded mb-1"
                 />

                 {/* priority selection */}
                 <select
                    value={t.priority}
                    onChange={(e) => onEditPriority(index, e.target.value)}
                    className="border px-2 py-1 rounded mb-1"
                 >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                 </select>

                {/* category selection */}
                <select
                  value={t.cateory}
                  onChange={(e) => onEditCategory(index, e.target.value)}
                  className="border px-2 py-1 rounded mb-1"
                >
                <option value="">Select Category</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="school">School</option>
                </select>

                {/* save button */}
                <button onClick={() => onSave(index)} className="bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500 transition">
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="font-medium">{t.text}</span>
                <div className="flex item-center gap-2 mt-1 sm:mt-0">
                  <span className="text.sm italic text-gray-500">
                    [{t.cateory || 'uncategorized'}]
                  </span>
                  <span className="text-sm text-gray-700 capitalize">{t.prioritize}</span>
                  {t.dueDate && (
                    <span className="text-sm text-gray-600">
                      Due: {new Date(t.dueDate).toLocaleDateString()}
                    </span>
                  )}
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

              {/* due date section under this comment here*/}
              {t.dueDate && (
                <span className="text-sm text-gray-600">
                Due: {new Date(t.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TaskList;