function TaskList({ tasks, onDelete, onToggleComplete, onStartEditing, onEdit, onSave, onEditPriority, onEditCategory, onEditDueDate}) {
  return (
    <ul className="space-y-4 mt-4">
      {tasks.map((t, index) => (
        <li
          key={index}
          className={`bg-white rounded-lg shadow-md border border-gray-200 p-4 ${
            t.complete ? `line-through text-gray-400` : ``
          }`}
        >
          {t.isEditing ? (
            <>
            {/* editing mode */}
            <input
              type="text"
              value={t.text}
              onChange={(e) => onEdit(index, e.target.value)}
              className="border px-2 py-1 rounded mb-2 w-full"
            />
            <input 
              type="data"
              value={t.onEditDueDate || ""}
              onChange={(e) => onEditDueDate(index, e.target.value)}
              className="border px-2 py-1 rounded mb-2 w-full"            
            />

            <select
              value={t.priority}
              onChange={(e) => onEditPriority(index, e.target.value)}
              className="border px-2 py-1 rounded mb-2 w-full"
            >
              <option value="low"> Low </option>
              <option value="medium"> Medium </option>
              <option value="high"> High </option>
            </select>

            <select
              value={t.category}
              onChange={(e) => onEditCategory(index, e.target.value)}
              className="border px-2 py-1 rounded mb-2 w-full"
            >
              <option value="">Select Category</option>
              <option value="work"> Work </option>
              <option value="personal"> Personal </option>
              <option value="school"> School </option>
            </select>

            <button
                onClick={() => onSave(index)}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Save
              </button>
            </>
          ) : (
            <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:item-center">
              {/* task information */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-3 sm:mb-0">
                {/* task text */}
                <span className="font-medium text-lg">
                  {t.text} 
                  </span>

                {/* category section */}
                <span className="text-sm italic text-gray-500">
                  Category:{t.category || "Uncategorized"} 
                </span>
                
                {/* priority */}
                <span className="flex items-center gap-1 text-sm text-gray-700 capitalize">
                  Priority: {t.priority} 
                  <span
                    className={`w-2 h-2 rounded-full ${
                      t.priority === "high"
                      ? "bg-red-500"
                      : t.priority === "medium"
                      ? "bg-yellow-400"
                      : "bg-green-500"
                    }`}
                  ></span>
                </span>

                {/* due date */}
                {t.dueDate && (
                  <span className="text-sm text-gray-600">
                    Due: {new Date(t.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* view mode for buttons */}
              <div className="flex flex-wrap gap-2 justify-end">
                {/* first button */}
                <button
                  onClick={() => onDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" 
                >
                  Delete
                </button>
                {/* second button */}
                <button
                  onClick={() => onToggleComplete(index)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover: bg-green-600 trasnition"
                >
                  {t.completed ? "Undo" : "Done"}
                </button>
                {/* third button */}
                <button
                  onClick={() => onStartEditing(index)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover: bg-blue-600 transition"
                >
                  Edit
                </button>
              </div>
            </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;