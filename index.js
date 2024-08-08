const express = require('express');
const app = express();
const bodyParser = require("body-parser");
require('./config/database')

const userRoutes = require('./routes/userRoutes');
const userDetailRoutes = require('./routes/userDetailRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Middleware to parse JSON request bodies
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/user-details', userDetailRoutes);
app.use('/api/course', courseRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




