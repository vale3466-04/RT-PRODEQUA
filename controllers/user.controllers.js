const User = require('../models/User');

const usersListarController = async (req,res) => {
    try {
        const users = await User.find().lean();
        console.log(users);
        res.json(users);
    }
    catch(error){
        console.log(error.message);
    }
};

const userListarController = async (req,res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        console.log(user);
        res.json(user);
    }
    catch(error){
        console.log(error.message);
    }
};

const userEditarController = async (req, res) => {
    try {
        console.log('Body:', req.body);
        await User.findByIdAndUpdate(req.params.id, req.body);
        const userUpdate = await User.findById(req.params.id).lean();
        console.log(userUpdate);
        res.json(userUpdate);
    } catch (error) {
        console.log(error.message);
    }
};

const userEliminarController = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Usuario eliminado satisfactoriamente'});
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    userEditarController,
    userEliminarController,
    userListarController,
    usersListarController,
}