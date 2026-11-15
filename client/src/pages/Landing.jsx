import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Building2, Users } from 'lucide-react';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        Streamlined Campus Placement & Drive Management
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
        Automated eligibility filtering, one-click student drive applications, and real-time recruitment tracking for Training & Placement Cells.
      </p>

      <div className="flex justify-center gap-4 mb-16">
        {user ? (
          <Link
            to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link to="/signup" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700">
              Get Started
            </Link>
            <Link to="/login" className="bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50">
              Sign In
            </Link>
          </>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <CheckCircle className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-bold text-lg mb-2">Automated Eligibility</h3>
          <p className="text-slate-600 text-sm">Instant verification against CGPA, active backlogs, and branch restrictions before students apply.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Building2 className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-bold text-lg mb-2">Centralized Drive Portal</h3>
          <p className="text-slate-600 text-sm">View CTC packages, job descriptions, drive schedules, and application deadlines in one place.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Users className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-bold text-lg mb-2">Live Shortlist Tracking</h3>
          <p className="text-slate-600 text-sm">Coordinators can update candidate rounds from Applied to Selected with instant student visibility.</p>
        </div>
      </div>
    </div>
  );
}