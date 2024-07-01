const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },

    last_name: {
      type: String,
      required: [true, "El apellido es obligatorio"],
    },

    email: {
      type: String,
      required: [true, "Correo obligatorio"],
    },

    password: {
      type: String,
      required: [true, "Contraseña obligatoria"],
    },
  },
  { versionKey: false }
);

module.exports = model("User", UserSchema);
