const express = require('express');
const router = express.Router();

router.get('/task', (req, res) => res.send('Api task'));

module.exports = router;