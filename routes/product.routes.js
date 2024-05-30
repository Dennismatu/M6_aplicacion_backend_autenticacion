//Importación de librerias necesarias
const { Router } = require("express");
const router = Router(); //Creacion de un router Express

//Importamos el controlador de los productos
const productController = require("../controllers/product.controller");

router.post("/api/product/create", productController.productPostCreate); //Para controlador sobre crear un producto

router.get("/api/product/readall", productController.productGetAll); //Asociamos el controlador de obtener la lista de productos

router.get("/api/product/readone/:id", productController.productGetOne); //Para controlador de obtener un producto

router.put("/api/product/update/:id", productController.productPutUpdate); //Para actualizacion de un producto

router.delete("/api/product/delete/:id", productController.productDelete); //Para eliminación de un producto

//Exportamos el router para usarlo en otras partes de la aplicación
module.exports = router;
