import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

import StudentDashboard from './pages/student/Dashboard';
import DriveDetails from './pages/student/DriveDetails';
import MyRegistrations from './pages/student/MyRegistrations';

import AdminDashboard from './pages/admin/Dashboard';
import ManageDrive from './pages/admin/ManageDrive';
import DriveRegistrations from './pages/admin/DriveRegistrations';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/drives/:id" element={<ProtectedRoute allowedRole="student"><DriveDetails /></ProtectedRoute>} />
          <Route path="/student/registrations" element={<ProtectedRoute allowedRole="student"><MyRegistrations /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/drives/new" element={<ProtectedRoute allowedRole="admin"><ManageDrive /></ProtectedRoute>} />
          <Route path="/admin/drives/edit/:id" element={<ProtectedRoute allowedRole="admin"><ManageDrive /></ProtectedRoute>} />
          <Route path="/admin/drives/:driveId/registrations" element={<ProtectedRoute allowedRole="admin"><DriveRegistrations /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}