const { response, request } = require("express");
const ProductModel = require("../models/product.model");
const { parse } = require("dotenv");

//Funcion de creacion de un producto con el Metodo POST en la ruta del endpoint pasando un JSON::::::::::::::::::::::::::
const productPostCreate = async (req = request, res = response) => {
  const body = req.body;
  let vehicles = new ProductModel(body);
  await vehicles.save();
  res.send("¡Creacion de producto exitoso!");
};

//Funcion de listado de todos los productos con el Metodo GET en la ruta del endpoint::::::::::::::::::::::::::::::::::::
const productGetAll = async (req = request, res = response) => {
  const products = await ProductModel.find();
  res.status(200).json({
    message: "Datos cargados correctamente",
    data: products,
  });
};

//Funcion de busqueda de un producto por ID con el Metodo GET en la ruta del endpoint::::::::::::::::::::::::::::::::::::
const productGetOne = async (req = request, res = response) => {
  //console.log("Entro a la funcion de busqueda");
  const { id } = req.query;

  try {
    const findProduct = await ProductModel.findById(id);

    if (!findProduct) {
      res.send("El producto buscado no existe");
    }
    res.status(200).json({
      message: "Producto encontrado",
      data: findProduct,
    });
  } catch (error) {
    return "Error al buscar el producto";
  }
};

//Funcion de actualizacion de un producto por ID con el Metodo PUT en la ruta del endpoint:::::::::::::::::::::::::::::::
const productPutUpdate = async (req = request, res = response) => {
  //query = id=123456 se usa cuando es opcional el dato
  //params = /:id se usa cuando es obligatorio
  const { id } = req.query;
  const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: "Datos actualizados correctamente",
    data: updateProduct,
  });
};

//Funcion de eliminación de un producto por ID con el Metodo DELETE en la ruta del endpoint:::::::::::::::::::::::::::::
const productDelete = async (req = request, res = response) => {
  const { id } = req.query;
  const deleteProduct = await ProductModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Datos eliminados correctamente",
    data: null,
  });
};

module.exports = {
  productPostCreate,
  productGetAll,
  productGetOne,
  productPutUpdate,
  productDelete,
};
