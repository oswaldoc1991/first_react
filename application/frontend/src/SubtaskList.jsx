export default function SubtaskList({ subtasks, onToggle}) {
    return (
        <ul className="ml-4 mt-2 space-y-1">
            {subtasks.map((st, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={st.done} onChange={() => onToggle(i)} />
                    <span className={st.done ? "line-through text-gray-400" : ""}>
                        {st.done}
                    </span>
                </li>
            ))}
        </ul>
    );
}