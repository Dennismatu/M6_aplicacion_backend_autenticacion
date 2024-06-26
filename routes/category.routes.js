//Importación de librerias necesarias
const { Router } = require("express");
const router = Router(); //Creacion de un router Express
const authMiddleware = require("../middleware/authorization");

//Importamos el controlador de las categorias
const categoryController = require("../controllers/category.controller");

router.post(
  "/api/categories/create",
  authMiddleware,
  categoryController.categoryPostCreate
); //Para controlador sobre crear un producto

router.get("/api/categories/readall", categoryController.categoryGetAll); //Asociamos el controlador de obtener la lista de categories

router.get("/api/categories/readone/:id", categoryController.categoryGetOne); //Para controlador de obtener un category

router.put("/api/categories/update/:id", categoryController.categoryPutUpdate); //Para actualizacion de un category

router.delete("/api/categories/delete/:id", categoryController.categoryDelete); //Para eliminación de un category

//Exportamos el router para usarlo en otras partes de la aplicación
module.exports = router;
