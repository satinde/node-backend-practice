const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// POST endpoint to create user details
router.post('/createCourse', courseController.createCourse);
router.get('/getCourse', courseController.getCourseData);
// DELETE endpoint to soft delete a course
router.delete('/delete/:id', courseController.deleteCourse);

module.exports = router;
