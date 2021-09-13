const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validarJWT = async ( req=request , res = response, next ) => {
    
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({ //401 Unauthorized
            msg: 'No hay Token en la request'
        })
    };

    try {

       const { uid } =  jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        
       //Encontrar usuario q responde a ese ID y agregarlo a la request
       //esto pasara desde este middleware hacia el controller.
       const user =  await User.findById( uid );

       if (!user){
        return res.status(401).json({
            msg: 'Token no válido. Usuario no existe en BD'
        })
       }

       //Validar si el usuario esta activo o no
       if (!user.estado){
           return res.status(401).json({
               msg: 'Token no válido. Usuario estado false'
           })
       };
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido.'
        })
    }

    

};

module.exports = {
    validarJWT
};