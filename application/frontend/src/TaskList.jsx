import React, { useState } from "react"

function TaskList({ 
  tasks, 
  onDelete, 
  onToggleComplete, 
  onStartEditing, 
  onEdit, 
  onSave, 
  onEditPriority, 
  onEditCategory, 
  onEditDueDate, 
  onAddSubtask, 
  onToggleSubtask, 
  onEditNotes, 
  onSetRecurring
}) {
  const [subtaskInputs, setSubtaskInputs] = useState ({});

  return (
    <ul className="space-y-4 ">
      {tasks.map((t, index) => (
        <li
          key={index}
          className={`bg-white rounded-lg shadow-md border border-gray-200 p-4 ${
            t.completed ? `line-through text-gray-400` : ``
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
              type="date"
              value={t.dueDate || ""}
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
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
                  className="bg-brand text-white px-3 py-1 rounded hover:brightness-90 transition" 
                >
                  Delete
                </button>
                {/* second button */}
                <button
                  onClick={() => onToggleComplete(index)}
                  className="bg-brand text-white px-3 py-1 rounded hover:brigthness-90 transition"
                >
                  {t.completed ? "Undo" : "Done"}
                </button>
                {/* third button */}
                <button
                  onClick={() => onStartEditing(index)}
                  className="bg-brand text-white px-3 py-1 rounded hover:brightness-90 transition"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* subtasks section */}
            <div className="mt-3">
              <h4 className="font-semibold text-sm">Subtasks:</h4>
              <ul className="ml-4 list-disc">
                {(t.subtasks || []).map ((st, subIndex) => (
                  <li key={subIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!!st.done}
                      onChange={() => onToggleSubtask(index, subIndex)}
                      className="mr-1"
                    />
                    <span className={st.done ? "line-through text-gray-500" : ""}>
                      {st.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={subtaskInputs[index] || ""}
                  onChange={(e) =>
                    setSubtaskInputs({ ...subtaskInputs, [index]: e.target.value})
                  }
                  placeholder="Add subtask"
                  className="border px-2 py-1 rounded flex-1"
                />
                <button
                  onClick={() => {
                    if ((subtaskInputs[index] || "").trim() !== "") {
                      onAddSubtask(index, subtaskInputs[index])
                      setSubtaskInputs({ ... subtaskInputs, [index]: ""})
                    }
                  }}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  aria-label="Add subtask"
                >
                +
                </button>
              </div>
            </div>

            {/* notes  */}
            <div className="mt-3">
              <h4 className="font-semibold text-sm">Notes: </h4>
              <textarea
                value={t.notes || ""}
                onChange={(e) => onEditNotes(index, e.target.value)}
                placeholder="Add Notes...."
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            {/* recurring  */}
            <div className="mt-3">
              <h4 className="font-semibold text-sm">Recurring: </h4>
              <select
                value={t.recurring || ""}
                onChange={(e) => onSetRecurring(index, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;