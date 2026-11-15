import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';

const STATUS_COLORS = {
  Applied: 'bg-blue-50 text-blue-700',
  Shortlisted: 'bg-amber-50 text-amber-700',
  Interviewing: 'bg-purple-50 text-purple-700',
  Selected: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-700'
};

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/registrations/my`).then((res) => setRegistrations(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">My Drive Applications</h1>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
            <tr>
              <th className="p-4">Company</th>
              <th className="p-4">Role</th>
              <th className="p-4">Package</th>
              <th className="p-4">Applied On</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td className="p-4 font-semibold">{reg.drive?.companyName}</td>
                <td className="p-4">{reg.drive?.role}</td>
                <td className="p-4">{reg.drive?.packageLPA}</td>
                <td className="p-4">{new Date(reg.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[reg.status]}`}>
                    {reg.status}
                  </span>
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr><td colSpan="5" className="p-6 text-center text-slate-500">No applications submitted yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}