import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
    <nav className="bg-blue-600 text-white p-4 shadow -md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">   
            <Link to="/mytasks" className="text-xl font-bold hover:text-gray-300">
                MyTasks
            </Link>

            <button className="sm:hidden text-white focus:outline-non" onClick={() => setIsOpen(!isOpen)}>
              ☰ 
            </button>
             <div className={`sm:flex gap-4 ${isOpen ? "block m" : "hidden sm:block"}`}>
                <Link to="/about" className="hover:text-gray-200 block sm:inline">About</Link>
                <Link to="/login" className="hover:text-gray-200 block sm:inline">Login</Link>
                <Link to="/get-started" className="hover:text-gray-200 block sm:inline">Get Started</Link>
             </div>
        </div>
     </nav>
    );
}