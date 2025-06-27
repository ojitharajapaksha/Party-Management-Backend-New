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
  '@schemaLocation': String,
  // Authentication fields
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  hashedPassword: {
    type: String,
    select: false // Don't include in queries by default
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
    default: false
  },
  subscribeToNewsletter: {
    type: Boolean,
    default: false
  },
  accountCreationDate: {
    type: Date,
    default: Date.now
  },
  lastLoginDate: Date,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date
}, { timestamps: true });

// Add index for email for faster queries
IndividualSchema.index({ email: 1 });

module.exports = mongoose.model('Individual', IndividualSchema);
