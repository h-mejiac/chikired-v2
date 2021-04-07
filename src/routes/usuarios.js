const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const { getMaxListeners } = require('../models/Usuario');

sgMail.setApiKey('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');

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
    const usuario = await Usuario.findOne({ empleado: req.body.empleado });
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
                //enviar correo
                const msg = {
                    to: usuarioUpdated['correo'],
                    from: 'Día del niño <evento@chikired.com>',
                    templateId: 'd-b31ae87fe9c0445988de887fbd57908d',
                    dynamic_template_data: {
                        nombre: usuarioUpdated['nombre'],
                        rango: usuarioUpdated['rango']
                    }
                };

                sgMail
                    .send(msg)
                    .then(() => {
                        console.log('Email sent')
                    }, error => {
                        console.error(error);

                        if (error.response) {
                            console.error(error.response.body)
                        }
                    });
                res.status(200).send({ user: usuarioUpdated });
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

router.get('/:id', async(req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
});

module.exports = router;