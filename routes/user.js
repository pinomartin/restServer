const { Router } = require("express");
const {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require("../controllers/users");


const router = Router();

router.get("/", getUsers);

router.put("/:id", putUser);

router.post("/", postUser);

router.patch("/", patchUser);

router.delete("/", deleteUser);

module.exports = router;
