const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    dni: {
        type: Number,
        required: true,
        min: 10000000,
        max: 99999999
    },
    nombres: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    apellidos: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    fechaNacimiento: {
        type: String,
        required: true,   
    },
    genero: {
        type: String,
        required: true,
        enum: ["Femenino", "Masculino"]
    },
    edad: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    estado: {
        type: String,
        required: true,
        enum: ["verdad", "falso"]
    },
    correo: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    contraseña: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    perfil: {
        type: String,
        required: true,
        enum: ['Administrador','Editor','Lector']
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);