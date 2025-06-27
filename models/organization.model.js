const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: String,
  nameType: String,
  tradingName: String,
  organizationType: String,
  status: String,
  isLegalEntity: Boolean,
  isHeadOffice: Boolean,
  organizationChildRelationship: Array,
  organizationParentRelationship: Array,
  contactMedium: Array,
  creditRating: Array,
  externalReference: Array,
  organizationIdentification: Array,
  partyCharacteristic: Array,
  relatedParty: Array,
  taxExemptionCertificate: Array,
  existsDuring: Object,
  '@type': String,
  '@baseType': String,
  '@schemaLocation': String
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);
