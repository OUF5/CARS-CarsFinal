const Course = require('../model/course.model');

module.exports.getCourses = async (request, response) => {
    const courses = await Course.find({});
    response.render('dashboard/coursesList', { courses })
}

/* ****** Show a specific course START ****** */

module.exports.getCourseDetails = async (request, response) => {
    const course = await Course.findById(request.params.id); 
    if (!course) {
        return response.redirect('/dashboard');
    }
    response.render('course/course-details', { course });
}

/* ****** Show a specific course END ****** */
