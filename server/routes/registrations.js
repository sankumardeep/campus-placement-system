const express = require('express');
const Registration = require('../models/Registration');
const Drive = require('../models/Drive');
const { protect, adminOnly } = require('../middleware/auth');
const { checkEligibility } = require('../utils/eligibility');

const router = express.Router();

// POST /api/registrations/:driveId - Student applies to drive
router.post('/:driveId', protect, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can apply to drives' });
    }

    const drive = await Drive.findById(req.params.driveId);
    if (!drive) return res.status(404).json({ message: 'Drive not found' });

    if (new Date() > new Date(drive.deadline)) {
      return res.status(400).json({ message: 'Application deadline has passed' });
    }

    const { isEligible, reasons } = checkEligibility(req.user, drive);
    if (!isEligible) {
      return res.status(400).json({ message: `Not eligible: ${reasons.join('; ')}` });
    }

    const existing = await Registration.findOne({ drive: drive._id, student: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'You have already applied to this drive' });
    }

    const registration = await Registration.create({
      drive: drive._id,
      student: req.user._id
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/registrations/my - Student's applications
router.get('/my', protect, async (req, res) => {
  try {
    const regs = await Registration.find({ student: req.user._id })
      .populate('drive')
      .sort({ createdAt: -1 });
    res.json(regs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/registrations/drive/:driveId - All applicants for a drive (Admin)
router.get('/drive/:driveId', protect, adminOnly, async (req, res) => {
  try {
    const regs = await Registration.find({ drive: req.params.driveId })
      .populate('student', '-password')
      .sort({ createdAt: -1 });
    res.json(regs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/registrations/:id/status - Update applicant status (Admin)
router.patch('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const reg = await Registration.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true }
    ).populate('student', '-password');
    if (!reg) return res.status(404).json({ message: 'Registration not found' });
    res.json(reg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;