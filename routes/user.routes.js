//Importación de librerias necesarias
const { Router } = require("express");
const router = Router(); //Creacion de un router Express

//Importamos el controlador de los usuarios
const userController = require("../controllers/user.controller");

router.post("/api/user/register", userController.userPostRegister); //Asociamos el controlador de creacion de usuarios

router.post("/api/user/login", userController.userPostLogin); //Para controlador de inicio de sesión

router.get("/api/user/verifytoken", userController.userGetToken); //Para controlador sobre mantener la sesion abierta

router.put("/api/user/update", userController.userPutUpdate); //Para actualizacion de los datos de usuario

//Exportamos el router para usarlo en otras partes de la aplicación
module.exports = router;
