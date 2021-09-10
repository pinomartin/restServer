const Role = require("../models/role");
const User = require("../models/user");


const esRolValido = async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol ${rol} no está registrado en la BD.`);
    }
  };

  //Verificar si el correo existe
  const existeEmail = async( email = '' ) => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El correo ${email} ya esta registrado. Ingresa otro.`)
    };
  };


  const existeUsuarioPorID = async( id ) => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID ${id} no existe.`);
    };
  };


  module.exports = {
      esRolValido,
      existeEmail,
      existeUsuarioPorID
  }