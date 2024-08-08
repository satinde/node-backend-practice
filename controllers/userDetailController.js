const { UserDetail, User } = require('../models');

// Controller function to create user details
async function createUserDetail(req, res) {
  try {
    const { userId, phoneNumber, address } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create user detail with provided data
    const newUserDetail = await UserDetail.create({ userId, phoneNumber, address });

    // Respond with the newly created user detail
    res.status(201).json(newUserDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createUserDetail,
};
