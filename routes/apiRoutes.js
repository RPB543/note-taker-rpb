const express = require('express');
const router = express.Router();

router.get('/api/animals', (req, res) => {
    res.send('Hello!');
  });


module.exports=router;