const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');


const courseController = require('../controllers/course.controller');

router.get('/:id', isLoggedIn, catchAsync(courseController.getCourseDetails));

module.exports = router;