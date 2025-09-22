import { createContext, useState, useContext, Children } from 'react';
import { useNavigate } from 'react-router-dom';

// creating the context of the user itself
const UserContext = createContext();

// exporting the hook to use it for the context
export const useUser = () => useContext(UserContext);

// provider component 
export const UserProvider = ({ Children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (email) => {
        setUser({ email });
        navigate('/dashboard');
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {Children}
        </UserContext.Provider>
    );
};