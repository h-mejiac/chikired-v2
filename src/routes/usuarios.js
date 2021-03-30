const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();

router.get('/', async(req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

router.post('/', async(req, res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();

    res.json({
        status: 'Registro base correcto'
    })
})

router.put('/:id', async(req, res) => {
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Registro correcto'
    })
});

router.delete('/:id', async(req, res) => {
    await Usuario.findByIdAndRemove(req.params.id, req.body);
    res.json({
        status: 'Elemento borrado'
    })
});

module.exports = router;