const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  packageLPA: { type: String, required: true },
  location: { type: String, default: 'Pan India' },
  driveDate: { type: Date, required: true },
  deadline: { type: Date, required: true },
  eligibility: {
    minCgpa: { type: Number, default: 0 },
    maxBacklogs: { type: Number, default: 0 },
    allowedBranches: [{ type: String }] // e.g., ["CSE", "ECE", "IT"]
  },
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Drive', driveSchema);