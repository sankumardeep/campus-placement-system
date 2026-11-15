const express = require('express');
const Drive = require('../models/Drive');
const { protect, adminOnly } = require('../middleware/auth');
const { checkEligibility } = require('../utils/eligibility');

const router = express.Router();

// GET /api/drives - Get all drives (with eligibility check if student)
router.get('/', protect, async (req, res) => {
  try {
    const drives = await Drive.find().sort({ createdAt: -1 }).lean();
    if (req.user.role === 'student') {
      const enriched = drives.map((drive) => ({
        ...drive,
        eligibilityCheck: checkEligibility(req.user, drive)
      }));
      return res.json(enriched);
    }
    res.json(drives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/drives/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id).lean();
    if (!drive) return res.status(404).json({ message: 'Drive not found' });

    if (req.user.role === 'student') {
      drive.eligibilityCheck = checkEligibility(req.user, drive);
    }
    res.json(drive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/drives - Create drive (Admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const drive = await Drive.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(drive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/drives/:id - Update drive (Admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const drive = await Drive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!drive) return res.status(404).json({ message: 'Drive not found' });
    res.json(drive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/drives/:id - Delete drive (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const drive = await Drive.findByIdAndDelete(req.params.id);
    if (!drive) return res.status(404).json({ message: 'Drive not found' });
    res.json({ message: 'Drive removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;