const { validationResult } = require("express-validator");


const validarCampos = ( req, res, next ) => {
  //errores que surgen del middleware de la route (check -email-)
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(errors);
  }
  //si llega hasta aca, sigue al proximo middleware
  next(); 

}

module.exports = {
    validarCampos
}