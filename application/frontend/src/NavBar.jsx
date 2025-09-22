import { useState } from "react";
import  { useUser } from './UserContext';
import { Link } from "react-router-dom";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useUser();
    
    return (
        <nav className="bg-gray-600 text-white p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* branding */}
                <Link to="/mytasks" className="text-xl font-bold hover:text-gray-300">
                    My Tasks
                </Link>

                {/* the toggle for the website */}
                <button className="sm:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>

                {/* linking section */}
                <div className={`sm:flex gap-4 ${isOpen ? "block" : "hidden sm:block"}`}>
                    <Link to="/about" className="hover:text-gray-200 block sm:inline">About</Link>
                    <Link to="/get-started" className="hover:text-gray-200 block sm:inline">Get Started</Link>
                    
                   {!user ? (
                    <Link to="/login" className="hover:text-gray-200 block sm:inline">
                    Login
                    </Link>
                    ) : (
                        <>
                        <Link to="/dashboard" className="hover:text-gray-200 block sm:inline">
                            Dashboard
                        </Link>
                        <span className="block sm:inline text-sm text-gray-100 mr-2">
                            Welcome, {user.email}
                        </span>
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white block sm:inline"
                        >
                            Logout
                        </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
    
}