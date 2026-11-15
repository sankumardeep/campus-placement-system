import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';

export default function DriveRegistrations() {
  const { driveId } = useParams();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/registrations/drive/${driveId}`).then((res) => setRegistrations(res.data));
  }, [driveId]);

  const handleStatusChange = async (regId, newStatus) => {
    const { data } = await axios.patch(`${API_URL}/registrations/${regId}/status`, { status: newStatus });
    setRegistrations((prev) => prev.map((r) => (r._id === regId ? data : r)));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Registered Candidates ({registrations.length})</h1>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
            <tr>
              <th className="p-4">Roll No</th>
              <th className="p-4">Name</th>
              <th className="p-4">Branch</th>
              <th className="p-4">CGPA</th>
              <th className="p-4">Resume</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td className="p-4 font-mono">{reg.student?.rollNumber}</td>
                <td className="p-4 font-medium">{reg.student?.name}</td>
                <td className="p-4">{reg.student?.branch}</td>
                <td className="p-4">{reg.student?.cgpa}</td>
                <td className="p-4">
                  {reg.student?.resumeLink ? (
                    <a href={reg.student.resumeLink} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                      View PDF
                    </a>
                  ) : 'N/A'}
                </td>
                <td className="p-4">
                  <select
                    value={reg.status}
                    onChange={(e) => handleStatusChange(reg._id, e.target.value)}
                    className="border border-slate-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr><td colSpan="6" className="p-6 text-center text-slate-500">No students have applied yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}