const { Course, User } = require('../models');

// Controller function to create user details
async function createCourse(req, res) {
  try {
    const { userId, courseName, courseCode,courseDetail } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create user detail with provided data
    const createCourse = await Course.create({ userId, courseName, courseCode,courseDetail });

    // Respond with the newly created user detail
    res.status(201).json(createCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}


async function getCourseData(req, res) {
    try {
      const courses = await Course.findAll({
        include: [{
          model: User,
          as: 'user', // Use the alias specified in the association
          // attributes: ['firstname', 'lastname', 'userEmail'] // Specify the attributes you want to retrieve
          attributes: {
            exclude: ['createdAt', 'updatedAt'] // Exclude createdAt and updatedAt fields
          }
        }]
      });
  
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Error fetching courses' });
    }
  }

  async function deleteCourse(req, res) {
    try {
      const courseId = req.params.id;
  
      // Find the course by ID
      const course = await Course.findByPk(courseId);
  
      // Check if the course exists
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Soft delete the course
      await course.destroy();
  
      // Respond with success message
      res.json({ message: 'Course soft deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

module.exports = {
  createCourse,
  getCourseData,
  deleteCourse
};
