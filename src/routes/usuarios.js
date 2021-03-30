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

router.post('/buscar', async(req, res) => {
    const usuario = await Usuario.find({ empleado: req.body.empleado });
    res.json(usuario);
});

router.put('/:id', async(req, res) => {
    await Usuario.findByIdAndUpdate(req.params.id, req.body, (err, usuarioUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en registro' });
        } else {
            if (!usuarioUpdated) {
                res.status(404).send({ message: 'Usuario no encontrado' });
            } else {
                res.status(200).send({ user: usuarioUpdated })
            }
        }
    });
});

router.delete('/:id', async(req, res) => {
    await Usuario.findByIdAndRemove(req.params.id, req.body);
    res.json({
        status: 'Elemento borrado'
    })
});

module.exports = router;