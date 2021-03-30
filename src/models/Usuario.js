const mongoose = require('mongoose');
const { Schema } = mongoose;

const Usuario = new Schema({
    empleado: String,
    nombre: String,
    correo: String,
    menoroscho: Boolean,
    mayornueve: Boolean,
    hijos: Number
});

module.exports = mongoose.model('Usuario', Usuario);