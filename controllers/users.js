const { request, response } = require("express");

const getUsers = (req = request, res = response) => {
  // const query = req.query; //para obtener los queryParams de la URL
  const { name, pass = "no password" } = req.query; //desestructuracion de URL params
  res.json({
    msg: "get API - controller",
    name,
    pass,
  });
};

const postUser = (req = request, res = response) => {
  const body = req.body;

  res.json({
    msg: "post API - controller",
    body,
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
