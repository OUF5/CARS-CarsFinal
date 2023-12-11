const mongoose = require('mongoose');
const Course = require('../model/course.model.js'); 
const Account = require('../model/account.model.js');
const assert = require('assert');

describe('Course Management', function() {
  before(async function() {
    const dbUrl = 'mongodb+srv://mohammed5ibnouf:xlcSXV3x6a3P1upc@cars.wec8tgx.mongodb.net/?retryWrites=true&w=majority';

    try {
      await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB Connected');
    } catch (err) {
      console.error('MongoDB Connection Error:', err);
    }
  });

  after(async function() {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (err) {
      console.error('MongoDB Disconnection Error:', err);
    }
  });

  it('should update accounts and course participants', async function() {
    const data = {
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
    };

    const course = new Course(data);

    try {
      // Save the course to the database
      const savedCourse = await course.save();
      console.log('Course added successfully');

      // Call the update function
      await updateAccountsAndCourse(savedCourse);

      // Retrieve the course
      const retrievedCourse = await Course.findOne({ course_id: data.course_id });

      // Retrieve all accounts with the given email
      const email = '219110250@psu.edu.sa';
      const accounts = await Account.find({ email });

      // Assertions
      assert.strictEqual(retrievedCourse.participants.length, accounts.length);

      // Additional assertions for your specific data logic can be added here

    } catch (err) {
      throw new Error(err);
    }
  });
});

async function updateAccountsAndCourse(data) {
    try {
      const course = new Course(data); // Create a new course instance
  
      // Save the course to the database
      const savedCourse = await course.save();
      console.log('Course added successfully');
  
      // Query accounts by email (example: "219110250@psu.edu.sa")
      const email = '219110250@psu.edu.sa';
      const accounts = await Account.find({ email: email });
  
      let studentIds = [];
      // Update each account
      for (let account of accounts) {
        account.courses.push(savedCourse._id); // Add course to account's courses
        await account.save(); // Save the updated account
  
        if (account.role === 'student') {
          studentIds.push(account._id); // If account is a student, add to studentIds
        }
      }
  
      // Update the course's participants field
      savedCourse.participants = studentIds;
      await savedCourse.save();
      console.log('Accounts and course participants updated successfully');
    } catch (err) {
      console.error(err);
    }
  }
  
