const { response, request } = require("express");
const UserModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userGetToken = (req = request, res = response) => {
  res.send("Entro a users GET");
};

const userPostRegister = async (req = request, res = response) => {
  const { name, last_name, email, password } = req.body;
  const salt = await bcryptjs.genSalt(10); //Crea una algo dificil para la contraseña.
  const hashedPassword = await bcryptjs.hash(password, salt);

  let user = new UserModel({
    name: name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
  });
  await user.save();
  res.send("¡Alta de usuario exitosa!");
};

const userPostLogin = async (req = request, res = response) => {
  // obtenemos el email y password de la petición
  const { email, password } = req.body;
  try {
    // buscamos al usuario
    let foundUser = await UserModel.findOne({ email });
    // si no se encuentra al usuario, devolvemos un error
    if (!foundUser) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    // si lo encuentra, evaluamos si la contraseña es correcta
    const passCorrecto = await bcryptjs.compare(password, foundUser.password);
    // si la contraseña es incorrecta, lo reportamos
    // debemos tener cuidado de no entregar más info de la estrictamente necesaria
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Usuario o contraseña incorecta" });
    }
    // si todo es correcto, generamos un json web token
    // 1. el 'payload' será un objeto que contendrá el id del usuario
    const payload = {
      user: {
        id: foundUser.id,
        full_name: foundUser.name + " " + foundUser.last_name,
      },
    };
    // 2. firma del jwt
    jwt.sign(
      payload,
      // usamos la palabra secreta para descifrar la firma electrónica del token
      process.env.SECRET,
      {
        expiresIn: 3600000, // expiración del token es de 1 hora
      },
      (error, token) => {
        if (error) throw error;
        //si todo va bien, retorna el token
        res.json({ token: token });
      }
    );
  } catch (error) {
    res.json({
      msg: "we have an error",
      error,
    });
  }
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
