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
  contactPersonName: {
    type: String,
    required: true
  },
  businessRegistrationNumber: String,
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
OrganizationSchema.index({ email: 1 });

module.exports = mongoose.model('Organization', OrganizationSchema);
