import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';

export default function ManageDrive() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    companyName: '', role: '', description: '', packageLPA: '', location: '',
    driveDate: '', deadline: '', minCgpa: 7.0, maxBacklogs: 0, allowedBranches: 'CSE, IT, ECE'
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API_URL}/drives/${id}`).then(({ data }) => {
        setForm({
          companyName: data.companyName,
          role: data.role,
          description: data.description,
          packageLPA: data.packageLPA,
          location: data.location,
          driveDate: data.driveDate.split('T')[0],
          deadline: data.deadline.split('T')[0],
          minCgpa: data.eligibility.minCgpa,
          maxBacklogs: data.eligibility.maxBacklogs,
          allowedBranches: data.eligibility.allowedBranches.join(', ')
        });
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      companyName: form.companyName,
      role: form.role,
      description: form.description,
      packageLPA: form.packageLPA,
      location: form.location,
      driveDate: form.driveDate,
      deadline: form.deadline,
      eligibility: {
        minCgpa: Number(form.minCgpa),
        maxBacklogs: Number(form.maxBacklogs),
        allowedBranches: form.allowedBranches.split(',').map((b) => b.trim()).filter(Boolean)
      }
    };

    if (isEdit) {
      await axios.put(`${API_URL}/drives/${id}`, payload);
    } else {
      await axios.post(`${API_URL}/drives`, payload);
    }
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Placement Drive' : 'Create Placement Drive'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input required value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Role</label>
              <input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Package (CTC)</label>
              <input required placeholder="e.g. 14 LPA" value={form.packageLPA} onChange={(e) => setForm({ ...form, packageLPA: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Drive Date</label>
              <input type="date" required value={form.driveDate} onChange={(e) => setForm({ ...form, driveDate: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Application Deadline</label>
              <input type="date" required value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Min CGPA</label>
              <input type="number" step="0.1" required value={form.minCgpa} onChange={(e) => setForm({ ...form, minCgpa: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Backlogs</label>
              <input type="number" required value={form.maxBacklogs} onChange={(e) => setForm({ ...form, maxBacklogs: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Branches (comma sep)</label>
              <input value={form.allowedBranches} onChange={(e) => setForm({ ...form, allowedBranches: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Description</label>
            <textarea rows="4" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2" />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700">
            {isEdit ? 'Save Changes' : 'Publish Drive'}
          </button>
        </form>
      </div>
    </div>
  );
}