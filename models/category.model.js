const { Schema, model } = require("mongoose");

const CategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la categoria es obligatoria"],
    },
  },

  { versionKey: false }
);

module.exports = model("Category", CategorySchema);
