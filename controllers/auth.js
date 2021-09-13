const { response, request } = require("express");
const encrypter = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");


const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    
    //Verificar si email existe
    const user = await User.findOne( {email} );
    if (!user){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - usuario'
        });
    };
    
    
    //Verificar si el usuario esta activo 
    if( !user.estado ){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado'
        });
    };
    

    //Verificar la password
    const validPassword = encrypter.compareSync( password, user.password );
    if( !validPassword ){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
        });
    }

    //Generar el JWT
    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });


  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      msg: "Ups!, algo salió mal!",
    });
  }
};

module.exports = {
  login,
};
