require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Drive = require('../models/Drive');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await User.deleteMany();
    await Drive.deleteMany();

    const admin = await User.create({
      name: 'Placement Coordinator',
      email: 'admin@campus.edu',
      password: 'password123',
      role: 'admin'
    });

    await User.create({
      name: 'Rahul Sharma',
      email: 'student@campus.edu',
      password: 'password123',
      role: 'student',
      rollNumber: '2301CS01',
      branch: 'CSE',
      cgpa: 8.6,
      backlogs: 0,
      graduationYear: 2027,
      resumeLink: 'https://example.com/resume.pdf'
    });

    await Drive.create([
      {
        companyName: 'TechNova Systems',
        role: 'Software Development Engineer (SDE-1)',
        description: 'Full-stack product engineering role working on distributed cloud systems.',
        packageLPA: '18 LPA',
        location: 'Bengaluru',
        driveDate: new Date(Date.now() + 10 * 86400000),
        deadline: new Date(Date.now() + 5 * 86400000),
        eligibility: { minCgpa: 7.5, maxBacklogs: 0, allowedBranches: ['CSE', 'IT', 'ECE'] },
        status: 'Upcoming',
        createdBy: admin._id
      },
      {
        companyName: 'DataPulse Analytics',
        role: 'Data Analyst',
        description: 'Build predictive pipelines and BI dashboards for enterprise clients.',
        packageLPA: '12 LPA',
        location: 'Hyderabad',
        driveDate: new Date(Date.now() + 14 * 86400000),
        deadline: new Date(Date.now() + 7 * 86400000),
        eligibility: { minCgpa: 7.0, maxBacklogs: 1, allowedBranches: ['CSE', 'IT', 'ECE', 'EEE'] },
        status: 'Upcoming',
        createdBy: admin._id
      }
    ]);

    console.log('Seed completed! Admin: admin@campus.edu / password123 | Student: student@campus.edu / password123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();