const express = require('express');
const fs = require("fs");
const router = express.Router();
const path = require('path');


router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    res.json(notes);
  })
});

// router.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'))
// });


module.exports = router;