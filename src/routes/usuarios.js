const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();

router.get('/', async(req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

module.exports = router;