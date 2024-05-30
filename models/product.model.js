const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
    brand: {
      type: String,
      required: [true, "Marca del vehiculo"],
    },

    model: {
      type: String,
      required: [true, "Modelo del vehiculo"],
    },

    year: {
      type: Number,
      required: [true, "Anio del vehiculo"],
    },

    cylinders: {
      type: Number,
      required: [true, "Numero de cilindros"],
    },

    category: {
      type: String,
      required: [true, "Segmento/Categoria del vehiculo"],
    },

    price: {
      type: Number,
      required: [true, "Precio del vehiculo"],
    },
  },
  { versionKey: false }
);

module.exports = model("Product", ProductSchema);
