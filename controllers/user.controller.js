const { response, request } = require("express");
const UserModel = require("../models/user.model");

const userGetToken = (req = request, res = response) => {
  res.send("Entro a users GET");
};

const userPostRegister = async (req = request, res = response) => {
  const body = req.body;
  let user = new UserModel(body);
  await user.save();
  res.send("¡Alta de usuario exitosa!");
};

const userPostLogin = (req = request, res = response) => {
  res.send("Entro a users login");
};

const userPutUpdate = (req = request, res = response) => {
  res.send("Entro a users Update");
};

module.exports = {
  userGetToken,
  userPostRegister,
  userPostLogin,
  userPutUpdate,
};
