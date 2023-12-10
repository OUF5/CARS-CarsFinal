const mongoose = require('mongoose');


// Schema for activities
const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true }
});

// Schema for grade distribution
const gradeDistributionSchema = new mongoose.Schema({
    grade: { type: String, required: true },
    count: { type: Number, required: true }
});

// Schema for testimonials
const testimonialSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    major: { type: String, required: true },
    feedback: { type: String, required: true }
});

const courseSchema = mongoose.Schema({
    course_id: { type: String, required: true },
    name: { type: String, required: true },
    numRegisteredStudents: { type: Number },
    numPassedStudents: { type: Number },
    activities: [activitySchema],
    gradeDistribution: [gradeDistributionSchema],
    testimonials: [testimonialSchema],

    // Add users field to represent enrolled students or instructors
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }]
});

module.exports = mongoose.model('Course', courseSchema);