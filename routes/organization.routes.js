const express = require('express');
const {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
} = require('../controllers/organization.controller.js');

const router = express.Router();

router.post('/', createOrganization);
router.get('/', getOrganizations);
router.get('/:id', getOrganizationById);
router.patch('/:id', updateOrganization);
router.delete('/:id', deleteOrganization);

module.exports = router;
