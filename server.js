const express = require("express");
require("dotenv").config();
const app = express();
const puerto = process.env.PORT || 3000;

const { dbConnection } = require("./database/config");

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");

app.use(express.json());

//Ruta inicio de la aplicación
app.get("/", (req, res) => {
  res.send("API registro de usuarios y productos V.1.0");
});

//Funcion arranque de aplicacion
(async () => {
  //Llamada a la función de conexion a la base de datos
  await dbConnection();

  //Llamada para cargar las rutas de Express
  app.use(userRoutes);
  app.use(productRoutes);
})();

app.listen(puerto, () => {
  console.log("Servidor escuchando en http://localhost:" + puerto);
});
