import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { Calendar, MapPin, IndianRupee, CheckCircle2, XCircle } from 'lucide-react';

export default function StudentDashboard() {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/drives`)
      .then((res) => setDrives(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading placement drives...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Active Placement Drives</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {drives.map((drive) => {
          const eligible = drive.eligibilityCheck?.isEligible;
          return (
            <div key={drive._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{drive.companyName}</h2>
                    <p className="text-indigo-600 font-medium">{drive.role}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    eligible ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {eligible ? <><CheckCircle2 className="w-3.5 h-3.5" /> Eligible</> : <><XCircle className="w-3.5 h-3.5" /> Not Eligible</>}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 my-4">
                  <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {drive.packageLPA}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {drive.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Deadline: {new Date(drive.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <Link
                to={`/student/drives/${drive._id}`}
                className="mt-4 block text-center bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800"
              >
                View Details & Apply
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}