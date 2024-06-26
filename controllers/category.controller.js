const { response, request } = require("express");
const CategoryModel = require("../models/category.model");
const { parse } = require("dotenv");

//Funcion de creacion de un categoria con el Metodo POST en la ruta del endpoint pasando un JSON::::::::::::::::::::::::::
const categoryPostCreate = async (req = request, res = response) => {
  const body = req.body;
  let categorias = new CategoryModel(body);
  await categorias.save();
  res.send("¡Creacion de categoria exitoso!");
};

//Funcion de listado de todos los productos con el Metodo GET en la ruta del endpoint::::::::::::::::::::::::::::::::::::
const categoryGetAll = async (req = request, res = response) => {
  const categories = await CategoryModel.find();
  res.status(200).json({
    message: "Datos cargados correctamente",
    data: categories,
  });
};

//Funcion de busqueda de un producto por ID con el Metodo GET en la ruta del endpoint::::::::::::::::::::::::::::::::::::
const categoryGetOne = async (req = request, res = response) => {
  //console.log("Entro a la funcion de busqueda");
  const { id } = req.query;

  try {
    const findCategory = await CategoryModel.findById(id);

    if (!findCategory) {
      res.send("La categoria buscada no existe");
    }
    res.status(200).json({
      message: "Categoria encontrado",
      data: findCategory,
    });
  } catch (error) {
    return "Error al buscar la categoria";
  }
};

//Funcion de actualizacion de un producto por ID con el Metodo PUT en la ruta del endpoint:::::::::::::::::::::::::::::::
const categoryPutUpdate = async (req = request, res = response) => {
  //query = id=123456 se usa cuando es opcional el dato
  //params = /:id se usa cuando es obligatorio
  const { id } = req.query;
  const updateCategory = await CategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: "Categoria actualizada correctamente",
    data: updateCategory,
  });
};

//Funcion de eliminación de un producto por ID con el Metodo DELETE en la ruta del endpoint:::::::::::::::::::::::::::::
const categoryDelete = async (req = request, res = response) => {
  const { id } = req.query;
  const deleteCategory = await CategoryModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Categoria eliminada correctamente",
    data: null,
  });
};

module.exports = {
  categoryPostCreate,
  categoryGetAll,
  categoryGetOne,
  categoryPutUpdate,
  categoryDelete,
};
