import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './NavBar';
import About from './About';
import Login from './Login';
import GetStarted from './GetStarted';
import MyTasks from './MyTasks';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Home from './Home'

function app() {
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
