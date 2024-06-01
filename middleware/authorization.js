const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    //Si no se tiene ningun dato de autorizacion
    return res.status(401).json({ msg: "Acceso no autorizado" });
  }
  try {
    console.log(authorization); //Se imprime para validar la información del token obtenida desde el header
    let [type, token] = authorization.split(" "); //Separa la informacion del header en las variables Bearer=type y el token=token.
    if (type === "Bearer") {
      const openToken = jwt.verify(token, process.env.SECRET);
      req.user = openToken.user; //Si fue correcto se asigna el usuario del token.
      next(); //Despues de realizar el trabajo si todo esta bien continua con el siguiente Middleware si lo hubiera. Como flujo en la ruta de la funcion utilizada.
    } else {
      return res.status(401).json({ msg: "Acceso no autorizado" });
    }
  } catch (error) {
    res.json({ msg: "Se produjo un error", error });
  }
};
