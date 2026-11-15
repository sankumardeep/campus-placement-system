import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'student',
    rollNumber: '', branch: 'CSE', cgpa: '', backlogs: 0, graduationYear: 2027, resumeLink: ''
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await signup({
        ...formData,
        cgpa: Number(formData.cgpa),
        backlogs: Number(formData.backlogs)
      });
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 mb-16 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input name="name" required onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2">
              <option value="student">Student</option>
              <option value="admin">Placement Admin</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">College Email</label>
          <input type="email" name="email" required onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" name="password" required onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
        </div>

        {formData.role === 'student' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Roll Number</label>
                <input name="rollNumber" required onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Branch</label>
                <select name="branch" value={formData.branch} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">ME</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current CGPA</label>
                <input type="number" step="0.01" max="10" name="cgpa" required onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Active Backlogs</label>
                <input type="number" min="0" name="backlogs" value={formData.backlogs} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Resume URL (Google Drive / Portfolio)</label>
              <input type="url" name="resumeLink" placeholder="https://..." onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </>
        )}

        <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700">
          Create Account
        </button>
      </form>
      <p className="text-sm text-center text-slate-600 mt-4">
        Already registered? <Link to="/login" className="text-indigo-600 font-medium">Sign in</Link>
      </p>
    </div>
  );
}