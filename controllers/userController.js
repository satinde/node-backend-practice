
const { User, UserDetail } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Controller function to create a new user
async function createUser(req, res) {
  try {
    // Create user with provided data
    const { firstName, lastName, userEmail } = req.body;
    console.log(req.body,"abc")
    const newUser = await User.create({ firstName, lastName, userEmail });

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Search query parameter
    const searchQuery = req.query.searchQuery || '';

    // Database query options
    const options = {
      limit: limit,
      offset: offset,
      where: {
        // Example: searching by userEmail
        userEmail: { [Op.like]: `%${searchQuery}%` }
      }
    };

    // Find users with pagination and search options
    const users = await User.findAll(options);

    // Count total number of users (for pagination)
    const totalUsers = await User.count({
      where: {
        userEmail: { [Op.like]: `%${searchQuery}%` }
      }
    });

    // Response object to send back with users and pagination info
    const response = {
      users: users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      count:totalUsers
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
};


async function getUsersWithDetails(req, res) {
  try {
    const users = await User.findAll({
      include: [{
        model: UserDetail,
        as: 'detail', // Use the alias specified in the association
      }]
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

const register =async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const user = await User.create({ userEmail, password });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login =async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ where: { userEmail } });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const token = jwt.sign({ id: user.id }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQL", { expiresIn: '1h' });
      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  login,register,
  getAllUsers,
  getUsersWithDetails
};

