import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login } = useUser();
    const navigate = useNavigate();

    return(
        <div className="p-8 max-w-md mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmaill(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border rounded" 
                />

                <input
                    type="password"
                    value={password}
                    onchange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                />

                <input
                    type="password"
                    value={confirmPassword}
                    onchange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="w-full p-2 border rounded"
                />

                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
}