const mongoose = require('mongoose');
const Course = require('./model/course.model.js'); 
const Account = require('./model/account.model.js'); 
// Database URL
const dbUrl = 'mongodb+srv://mohammed5ibnouf:xlcSXV3x6a3P1upc@cars.wec8tgx.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Data to be added
    data = {
        course_id:'SE371',
        name: 'Web Engineering',
        numRegisteredStudents: 9,
        numPassedStudents: 8,
        activities: [
            { name: "Quiz 1", weight: 5 },
            { name: "Quiz 2", weight: 5 },
            { name: "Major 1", weight: 20 },
            { name: "Major 2", weight: 20 },
            { name: "Homeworks", weight: 5 },
            { name: "Attendance", weight: 5 },
            { name: "Final", weight: 40 }
        ],
        gradeDistribution: [
            { grade: "A", count: 2 },
            { grade: "B", count: 1 },
            { grade: "C", count: 2 },
            { grade: "D", count: 3 },
            { grade: "F", count: 1 },
        ],
        testimonials: [
            { studentId: "219110001", major: "CS", feedback: "I Failed" },
            { studentId: "219110085", major: "SE", feedback: "I Aced" }
        ],
    }

// Create a new course instance
const course = new Course(data);

// Function to update accounts and course participants
async function updateAccountsAndCourse() {
    try {
        // Save the course to the database
        const savedCourse = await course.save();
        console.log('Course added successfully');

        // Query all accounts
        // const accounts = await Account.find({});

        const email = "219110250@psu.edu.sa";
        const accounts = await Account.find({ email: email }); 

        // Array to hold IDs of students
        let studentIds = [];

        // Update each account
        for (let account of accounts) {
            account.courses.push(savedCourse._id); // add course to account's courses
            await account.save(); // save the updated account

            // If account is a student, add to studentIds
            if(account.role === 'student') {
                studentIds.push(account._id);
            }
        }

        // Update the course's participants field
        savedCourse.participants = studentIds;
        await savedCourse.save();
        console.log('Accounts and course participants updated successfully');
    } catch (err) {
        console.log(err);
    }
}

// Execute the function
updateAccountsAndCourse();
