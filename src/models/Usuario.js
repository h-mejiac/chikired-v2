const mongoose = require('mongoose');
const { Schema } = mongoose;

const Usuario = new Schema({
    empleado: Number,
    nombre: String,
    correo: String,
    rango: String,
    registro: Date,
    hijos: Number
});

module.exports = mongoose.model('Usuario', Usuario);