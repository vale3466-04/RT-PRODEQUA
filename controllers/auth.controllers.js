const User = require('../models/User');

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi').extend(require('@joi/date'));
const jwt = require('jsonwebtoken');

const schemaRegister = Joi.object({
    dni: Joi.number().required(),
    nombres: Joi.string().min(2).max(255).required(),
    apellidos: Joi.string().min(2).max(255).required(),
    fechaNacimiento: Joi.string().required(),
    genero: Joi.string().required(),
    edad: Joi.number().min(0).max(150).required(),
    estado: Joi.string().required(),
    correo: Joi.string().min(6).max(255).required().email(),
    contraseña: Joi.string().min(6).max(1024).required(),
    perfil: Joi.string().required(),
})

const schemaLogin = Joi.object({
    correo: Joi.string().min(6).max(255).required().email(),
    contraseña: Joi.string().min(6).max(1024).required()
})

const authLoginController = async (req,res) => {

    //Validaciones
    const{ error } = schemaLogin.validate(req.body);
    if(error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({correo: req.body.correo});
    console.log(user)
    if(!user) return res.status(400).json({ error: true, mensaje: 'Correo no registrado' });

    const passValida = await bcrypt.compare(req.body.contraseña, user.contraseña)
    if(!passValida) return res.status(400).json({ error: true, mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign ({
        nombres: user.nombres,
        apellidos: user.apellidos,
        id: user._id
    }, process.env.TOKEN_SECRET, { expiresIn : "1h"});

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
};

const  authRegisterController = async (req, res) => {
    const dni = req.body.dni;
    const fechaNacimiento = req.body.fechaNacimiento;
    // Validacion de DNI
    if(dni < 10000000 || dni > 99999999 || typeof dni !== 'number') {
        console.log(typeof dni)
        return res.status(404).json({error: 'El DNI ingresado debe ser numérico y debe contener 8 dígitos.'})
    }

    //Validacion de fecha de nacimiento
    const fechaParse = Date.parse(fechaNacimiento);
    console.log(fechaParse)
    if (isNaN(fechaParse)) {
        return res.status(404).json({error: 'El formato de fecha es YYYY/MM/DD.'})
    }

    //Validacion del request
    const {error} = schemaRegister.validate(req.body)
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }

    // Validar email unico
    const existeEmail = await User.findOne({correo: req.body.correo});
    console.log('correoRegistrado', existeEmail)
    if(existeEmail) return res.status(400).json({error: true, mensaje:'email ya registrado' })
    
    // Encriptar password
    const saltos = await bcrypt.genSalt(10);
    const contraseña = await bcrypt.hash(req.body.contraseña, saltos);
    
    const user = new User({
        dni: req.body.dni,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero,
        edad: req.body.edad,
        estado: req.body.estado,
        correo: req.body.correo,
        contraseña,
        perfil: req.body.perfil,
    })

    try {
        const userDB = await user.save();
        res.json({
            error: null,
            data: userDB
        })

    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    authLoginController,
    authRegisterController
}