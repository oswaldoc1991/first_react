import './App.css';
import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar';
import About from './About';
import Login from './Login';
import GetStarted from './GetStarted';
import MyTasks from './MyTasks';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Dashboard from './Dashboard';
import Home from './Home';

function App() {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/mytasks" element={<MyTasks />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <footer />
    </div>
  );
}

export default App;