const checkEligibility = (student, drive) => {
  const { minCgpa, maxBacklogs, allowedBranches } = drive.eligibility;
  const reasons = [];

  if (student.cgpa < minCgpa) {
    reasons.push(`Minimum CGPA required is ${minCgpa} (Your CGPA: ${student.cgpa})`);
  }
  if (student.backlogs > maxBacklogs) {
    reasons.push(`Maximum allowed backlogs: ${maxBacklogs} (Your backlogs: ${student.backlogs})`);
  }
  if (allowedBranches && allowedBranches.length > 0 && !allowedBranches.includes(student.branch)) {
    reasons.push(`Allowed branches: ${allowedBranches.join(', ')} (Your branch: ${student.branch || 'N/A'})`);
  }

  return {
    isEligible: reasons.length === 0,
    reasons
  };
};

module.exports = { checkEligibility };