const jwt = require('jsonwebtoken');

// Middleare para validar jwt (rutas protegidas)

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({ error: 'Acceso denegado'})
    try {
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verificar;
        next(); //continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;