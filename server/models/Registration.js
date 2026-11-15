const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  drive: { type: mongoose.Schema.Types.ObjectId, ref: 'Drive', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Interviewing', 'Selected', 'Rejected'],
    default: 'Applied'
  },
  remarks: { type: String, default: '' }
}, { timestamps: true });

// Prevent duplicate applications
registrationSchema.index({ drive: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);