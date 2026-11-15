import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
        <Briefcase className="w-6 h-6" />
        <span>PlaceTrack</span>
      </Link>

      <div className="flex items-center gap-6">
        {!user ? (
          <>
            <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium">Login</Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {user.role === 'admin' ? (
              <>
                <Link to="/admin/dashboard" className="text-slate-600 hover:text-indigo-600 font-medium">Dashboard</Link>
                <Link to="/admin/drives/new" className="text-slate-600 hover:text-indigo-600 font-medium">Post Drive</Link>
              </>
            ) : (
              <>
                <Link to="/student/dashboard" className="text-slate-600 hover:text-indigo-600 font-medium">Drives</Link>
                <Link to="/student/registrations" className="text-slate-600 hover:text-indigo-600 font-medium">My Applications</Link>
              </>
            )}
            <span className="text-sm text-slate-500 hidden sm:inline">Hi, {user.name}</span>
            <button onClick={handleLogout} className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}