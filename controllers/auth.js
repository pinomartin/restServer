const { response, request } = require("express");
const encrypter = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar si email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - usuario",
      });
    }

    //Verificar si el usuario esta activo
    if (!user.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado",
      });
    }

    //Verificar la password
    const validPassword = encrypter.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    //Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Ups!, algo salió mal!",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);
    const { email, nombre, img } = googleUser;

    //Verificar si existe el user en la BD
    let user = await User.findOne({ email });

    if (!user){
      //Crearlo
      const data = {
        nombre,
        email,
        password: ':)',
        img,
        google: true
      };

      user = new User( data );
      await user.save();
    }

    //Si el user en BD 
    if( !user.estado ) {
      return res.status(401).json({
        msg: 'El usuario esta bloqueado. Contacte al admin.'
      })
    };

    //Generar JWT
    const token = await generateJWT( user.id );

    res.json({
      msg: "Todo OK Google SIgn IN",
      user,
      token
    });
    
  } catch (error) {
    console.log(error);

    res.status(400).json({
      msg: "Google Token no reconocido.",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
