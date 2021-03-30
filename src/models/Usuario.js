const mongoose = require('mongoose');
const { Schema } = mongoose;

const Usuario = new Schema({
    empleado: String,
    nombre: String,
    correo: String,
    rango: String,
    hijos: Number
});

module.exports = mongoose.model('Usuario', Usuario);