import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';

export default function DriveDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drive, setDrive] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    axios.get(`${API_URL}/drives/${id}`).then((res) => setDrive(res.data));
  }, [id]);

  const handleApply = async () => {
    try {
      await axios.post(`${API_URL}/registrations/${id}`);
      setMessage({ type: 'success', text: 'Application submitted successfully!' });
      setTimeout(() => navigate('/student/registrations'), 1200);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Could not apply' });
    }
  };

  if (!drive) return <div className="p-8 text-center">Loading drive details...</div>;

  const { isEligible, reasons } = drive.eligibilityCheck || {};

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="border-b border-slate-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold">{drive.companyName}</h1>
          <p className="text-lg text-indigo-600 font-medium mt-1">{drive.role} • {drive.packageLPA}</p>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-lg">Job Description</h3>
          <p className="text-slate-700 whitespace-pre-line">{drive.description}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
          <h3 className="font-bold mb-2">Eligibility Criteria</h3>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Minimum CGPA: <strong>{drive.eligibility.minCgpa}</strong></li>
            <li>• Max Active Backlogs: <strong>{drive.eligibility.maxBacklogs}</strong></li>
            <li>• Allowed Branches: <strong>{drive.eligibility.allowedBranches.join(', ') || 'All'}</strong></li>
          </ul>
        </div>

        {!isEligible && reasons?.length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-sm">
            <p className="font-bold mb-1">You do not meet the eligibility criteria:</p>
            <ul className="list-disc pl-5">
              {reasons.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        )}

        {message.text && (
          <div className={`p-4 rounded-lg mb-6 text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <button
          disabled={!isEligible}
          onClick={handleApply}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {isEligible ? 'Confirm & Submit Application' : 'Ineligible to Apply'}
        </button>
      </div>
    </div>
  );
}