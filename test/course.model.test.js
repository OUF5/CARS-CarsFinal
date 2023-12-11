const assert = require('assert');
const { app, server } = require('../app'); // Import your app and server
const Course = require('../model/course.model'); // Import your course model

describe('Course Model', () => {
  after((done) => {
    server.close(done); // Close the server after all tests are done
  });

  it('should create a new course', async () => {
    const courseData = {
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

    const newCourse = new Course(courseData);
    const savedCourse = await newCourse.save();

    assert.strictEqual(savedCourse.course_id, courseData.course_id);
    // Add more assertions for other fields as needed
  });

  it('should find a course by course_id', async () => {
    const courseData = {
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

    const newCourse = new Course(courseData);
    await newCourse.save();

    const foundCourse = await Course.findOne({ course_id: courseData.course_id });

    assert.strictEqual(foundCourse.course_id, courseData.course_id);
    // Add more assertions for other fields as needed
  });

  // Add more test cases for other functionalities related to your Course model
});
