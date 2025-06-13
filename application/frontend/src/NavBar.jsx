function NavBar () {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <a href="#" className="text-xl font-bold hover:text-gray-300">MyTasks</a>
                <div className="space-x-4">
                    <a href="#" className="hover:text-gray-300 px-2">About </a>|<a href="#" className="hover:text-gray-300 px-2"> Login</a>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;