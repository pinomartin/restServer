const { request, response } = require("express");
const encrypter = require("bcryptjs");

const User = require("../models/user"); //se pone en Camelcase ya que se crearan instancias de Usuario

const getUsers = (req = request, res = response) => {
  // const query = req.query; //para obtener los queryParams de la URL
  const { name, pass = "no password" } = req.query; //desestructuracion de URL params
  res.json({
    msg: "get API - controller",
    name,
    pass,
  });
};

const postUser = async (req = request, res = response) => {
  const { nombre, email, password, rol } = req.body;
  const user = new User({ nombre, email, password, rol }); //si el body llegara a contener data que no esta en el modelo , esta data se ignora

  //Verificar si el correo existe
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya esta registrado. Ingresa otro.",
    });
  }

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

const putUser = (req = request, res = response) => {
  const id = req.params.id; //el mismo nombre que se le da al path en la route

  res.json({
    msg: "put API - controller",
    id,
  });
};
const patchUser = (req = request, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};
const deleteUser = (req = request, res = response) => {
  res.json({
    msg: "delete API - controller",
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
};
