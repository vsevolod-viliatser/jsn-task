
const express = require('express');
const router = express.Router();
const Superhero = require('../models/Superhero');


router.post('/', async (req, res) => {
  try {
    const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = req.body;
    const superhero = new Superhero({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    });
    await superhero.save();
    res.status(201).json(superhero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const superheroes = await Superhero.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select('nickname images')
      .exec();

    const heroesWithOneImage = superheroes.map(hero => ({
      _id: hero._id,
      nickname: hero.nickname,
      image: hero.images[0] || null,
    }));

    res.json(heroesWithOneImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) return res.status(404).json({ message: 'Superhero not found' });
    res.json(superhero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = req.body;

    const superhero = await Superhero.findByIdAndUpdate(
      req.params.id,
      { nickname, real_name, origin_description, superpowers, catch_phrase, images },
      { new: true }
    );

    if (!superhero) return res.status(404).json({ message: 'Superhero not found' });
    res.json(superhero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findByIdAndDelete(req.params.id);
    if (!superhero) return res.status(404).json({ message: 'Superhero not found' });
    res.json({ message: 'Superhero deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
