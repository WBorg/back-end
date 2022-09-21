const usersRoutes = require('express').Router();
const users = require('../controllers/users.controller');
const { validaToken} = require('../middlewares/auth');
const upload = require('../middlewares/uploadImgUser');



usersRoutes.get("/all",validaToken, users.findAll);

usersRoutes.get("/show/:id",validaToken, users.findOne);

usersRoutes.post("/create",validaToken, users.create);

usersRoutes.put("/update",validaToken, users.update);

usersRoutes.delete("/delete/:id",validaToken, users.delete);

usersRoutes.post("/login", users.login);

usersRoutes.put("/changepass",validaToken, users.changepass);

usersRoutes.put("/edit-profile-image",validaToken,upload.single('image'), users.editProfileImage);

usersRoutes.get("/view-profile/:id",validaToken, users.viewProfile);

module.exports = usersRoutes;