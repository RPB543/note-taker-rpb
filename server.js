// Required Dependencies
const express = require("express");
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initialize express app
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//express middleware to connect HTML linked files (CSS, JS)
app.use(express.static('public'));

// use Routes
app.use('/api', apiRoutes);
app.use('/api', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
