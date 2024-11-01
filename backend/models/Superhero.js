
const mongoose = require('mongoose');

const SuperheroSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  real_name: { type: String, required: true },
  origin_description: { type: String },
  superpowers: { type: [String], required: true },
  catch_phrase: { type: String },
  images: { type: [String] }, // Массив URL для изображений
});

module.exports = mongoose.model('Superhero', SuperheroSchema);
