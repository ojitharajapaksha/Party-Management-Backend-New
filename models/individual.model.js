const mongoose = require('mongoose');

const TimePeriodSchema = new mongoose.Schema({
  startDateTime: Date,
  endDateTime: Date
}, { _id: false });

const IndividualSchema = new mongoose.Schema({
  gender: String,
  countryOfBirth: String,
  nationality: String,
  maritalStatus: String,
  birthDate: Date,
  givenName: String,
  preferredGivenName: String,
  familyName: String,
  legalName: String,
  middleName: String,
  fullName: String,
  formattedName: String,
  status: String,
  contactMedium: Array,
  creditRating: Array,
  disability: Array,
  externalReference: Array,
  individualIdentification: Array,
  languageAbility: Array,
  otherName: Array,
  partyCharacteristic: Array,
  relatedParty: Array,
  skill: Array,
  taxExemptionCertificate: Array,
  '@type': String,
  '@baseType': String,
  '@schemaLocation': String
}, { timestamps: true });

module.exports = mongoose.model('Individual', IndividualSchema);
