const {login, register, setAvatar, getAllUsers} = require("../controllers/userContronller")


const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
// router.get("/logout/:id", LogOut);

module.exports = router;
