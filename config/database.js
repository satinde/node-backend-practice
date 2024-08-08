
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('dbPractise', 'root', 'Deep@1234', {
  host: 'localhost',
  dialect: 'mysql'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // Ensure the Sequelize connection closes properly
    await sequelize.close();
  }
}

// Call the function to test the connection
testConnection()