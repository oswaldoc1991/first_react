import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext'

export default function Dashboard() {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className='p-8 max-w-2xl mx-auto'>
            <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
            <p className="text-lg">
                Welcome back, <span className="font-semibold">{user.email}</span>
            </p>

            <div className="mt-6 bg-white rounded shadow p-4">
                <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <Link href="/mytasks" className="text-blue-600 hover:underline">View My Task</Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-blue-600 hover:underline">About This App</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}