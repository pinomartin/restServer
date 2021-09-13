const { request, response } = require("express");
const encrypter = require("bcryptjs");

const User = require("../models/user"); //se pone en Camelcase ya que se crearan instancias de Usuario

const getUsers = async (req = request, res = response) => {
  // const query = req.query; //para obtener los queryParams de la URL
  // const { name, pass = "no password" } = req.query; //desestructuracion de URL params
  const { limit = 5, desde = 0 } = req.query;
  const filter = { estado: true };

  // const usersDB = await User.find(filter) //trae todos los documentos con esa condicion
  //   .skip(Number(desde))
  //   .limit(Number(limit));

  // const totalUsers = await User.countDocuments(filter);

  const [ total , users ] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter) //trae todos los documentos con esa condicion
      .skip(Number(desde))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    users
  });
};

const postUser = async (req = request, res = response) => {
  const { nombre, email, password, rol } = req.body;
  const user = new User({ nombre, email, password, rol }); //si el body llegara a contener data que no esta en el modelo , esta data se ignora

  //Encriptar la Pass
  const salt = encrypter.genSaltSync(); //N° de vueltas del encrypter (10 default)
  user.password = encrypter.hashSync(password, salt);

  //Guardar en DB
  await user.save(); //para guardar en la BD el usuario

  res.json({
    msg: "post API - controller",
    user,
  });
};

const putUser = async (req = request, res = response) => {
  const id = req.params.id; //el mismo nombre que se le da al path en la route
  const { _id, password, google, email, ...resto } = req.body; //se excluyen del update y se trabaja con el resto de las props

  //TODO: Validar vs BD
  if (password) {
    //Encriptar la Pass
    const salt = encrypter.genSaltSync(); //N° de vueltas del encrypter (10 default)
    resto.password = encrypter.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, resto);

  res.json({
    userDB,
  });
};

const patchUser = (req = request, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

const deleteUser = async (req = request, res = response) => {

  const { id } = req.params;
  //Borrado fisico del user
  // const user = await User.findByIdAndDelete( id );
  
  //Borrado logico del user
  const user = await User.findByIdAndUpdate( id, { estado: false } );

  //Esto se obtiene desde los middlewares (en este caso de validar-jwt)
  // const authenticatedUser = req.user;

  res.json({
    user,
    // authenticatedUser
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
};
