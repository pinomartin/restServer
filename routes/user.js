const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require("../controllers/users");
const { esRolValido } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

router.get("/", getUsers);

router.put("/:id", putUser);

router.post(
  "/",
  //aqui en el 2° param le mandamos los middlewares, este enviara al
  //POST el validationResult, ("prepara" el error)
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de 8 caracteres o más.").isLength({
      min: 8,
    }),
    check("email", "El correo no es válido.").isEmail(),
    check("rol").custom( esRolValido ),
    validarCampos, //recibe todos los errores q arroja el check
  ],
  postUser
);

router.patch("/", patchUser);

router.delete("/", deleteUser);

module.exports = router;
