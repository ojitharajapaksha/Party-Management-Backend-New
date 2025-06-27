const express = require('express');
const {
  createIndividual,
  getIndividuals,
  getIndividualById,
  updateIndividual,
  deleteIndividual
} = require('../controllers/individual.controller.js');

const router = express.Router();

router.post('/', createIndividual);
router.get('/', getIndividuals);
router.get('/:id', getIndividualById);
router.patch('/:id', updateIndividual);
router.delete('/:id', deleteIndividual);

module.exports = router;
