const Individual = require('../models/individual.model.js');

const createIndividual = async (req, res) => {
  try {
    const individual = new Individual(req.body);
    await individual.save();
    res.status(201).json(individual);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getIndividuals = async (req, res) => {
  try {
    const individuals = await Individual.find();
    res.status(200).json(individuals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getIndividualById = async (req, res) => {
  try {
    const individual = await Individual.findById(req.params.id);
    if (!individual) return res.status(404).json({ message: 'Not found' });
    res.json(individual);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateIndividual = async (req, res) => {
  try {
    const individual = await Individual.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(individual);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteIndividual = async (req, res) => {
  try {
    await Individual.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createIndividual,
  getIndividuals,
  getIndividualById,
  updateIndividual,
  deleteIndividual
};
