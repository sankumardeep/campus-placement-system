import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { Plus, Users, Edit, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [drives, setDrives] = useState([]);

  const fetchDrives = () => {
    axios.get(`${API_URL}/drives`).then((res) => setDrives(res.data));
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this placement drive?')) return;
    await axios.delete(`${API_URL}/drives/${id}`);
    fetchDrives();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Placement Drives</h1>
        <Link to="/admin/drives/new" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">
          <Plus className="w-4 h-4" /> Create New Drive
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
            <tr>
              <th className="p-4">Company</th>
              <th className="p-4">Role</th>
              <th className="p-4">CTC</th>
              <th className="p-4">Min CGPA</th>
              <th className="p-4">Deadline</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {drives.map((drive) => (
              <tr key={drive._id}>
                <td className="p-4 font-bold">{drive.companyName}</td>
                <td className="p-4">{drive.role}</td>
                <td className="p-4">{drive.packageLPA}</td>
                <td className="p-4">{drive.eligibility?.minCgpa}</td>
                <td className="p-4">{new Date(drive.deadline).toLocaleDateString()}</td>
                <td className="p-4 flex justify-end gap-3">
                  <Link to={`/admin/drives/${drive._id}/registrations`} className="text-indigo-600 hover:underline flex items-center gap-1">
                    <Users className="w-4 h-4" /> Applicants
                  </Link>
                  <Link to={`/admin/drives/edit/${drive._id}`} className="text-slate-600 hover:text-slate-900">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(drive._id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}