import { Link } from "react-router-dom";

export default function NavBar() {
    return (
    <nav className="bg-blue-600 text-white p-4 shadow -md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">   
            <Link to="/mytasks" className="text-xl font-bold hover:text-gray-300">
                MyTasks
            </Link>
             <div className="space-x-4">
                <Link to="/about" className="hover:text-gray-300">About | </Link>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
             </div>
        </div>
     </nav>
    );
}