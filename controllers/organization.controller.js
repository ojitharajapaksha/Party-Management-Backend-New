const Organization = require('../models/organization.model.js');
const bcrypt = require('bcryptjs');

const createOrganization = async (req, res) => {
  try {
    const {
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      phone,
      organizationName,
      organizationType,
      businessRegistrationNumber,
      agreeToTerms,
      subscribeToNewsletter,
      ...otherData
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !organizationName) {
      return res.status(400).json({ 
        error: 'Missing required fields: firstName, lastName, email, phone, and organizationName are required' 
      });
    }

    // Validate password if provided
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ 
          error: 'Password must be at least 8 characters long' 
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ 
          error: 'Passwords do not match' 
        });
      }
    }

    // Check if organization already exists
    const normalizedEmail = email.toLowerCase().trim();
    
    console.log('Checking for existing organization with email:', normalizedEmail);
    
    const existingOrganization = await Organization.findOne({
      $or: [
        { 'contactMedium.characteristic.emailAddress': normalizedEmail },
        { email: normalizedEmail },
        { name: organizationName }
      ]
    });

    console.log('Existing organization found:', existingOrganization ? 'Yes' : 'No');

    if (existingOrganization) {
      console.log('Existing organization details:', {
        id: existingOrganization._id,
        email: existingOrganization.email,
        name: existingOrganization.name,
        contactMedium: existingOrganization.contactMedium
      });
      return res.status(400).json({ 
        error: 'An organization with this email or name already exists' 
      });
    }

    // Prepare organization data with proper mapping
    const organizationData = {
      name: organizationName,
      tradingName: organizationName,
      organizationType: organizationType || 'company',
      isLegalEntity: true,
      isHeadOffice: true,
      status: 'active',
      contactMedium: [
        {
          mediumType: 'email',
          preferred: true,
          characteristic: {
            emailAddress: normalizedEmail
          }
        },
        {
          mediumType: 'phone',
          preferred: false,
          characteristic: {
            phoneNumber: phone
          }
        }
      ],
      // Store additional authentication context
      email: normalizedEmail,
      phone: phone,
      contactPersonName: `${firstName} ${lastName}`,
      businessRegistrationNumber: businessRegistrationNumber,
      agreeToTerms: agreeToTerms,
      subscribeToNewsletter: subscribeToNewsletter,
      accountCreationDate: new Date(),
      ...otherData
    };

    // Hash password if provided
    if (password) {
      const saltRounds = 10;
      organizationData.hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const organization = new Organization(organizationData);
    await organization.save();

    // Remove sensitive data from response
    const responseData = organization.toObject();
    delete responseData.hashedPassword;

    res.status(201).json({
      success: true,
      message: 'Organization account created successfully',
      data: responseData
    });
  } catch (err) {
    console.error('Error creating organization:', err);
    res.status(400).json({ 
      error: err.message || 'Failed to create organization account'
    });
  }
};

const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) return res.status(404).json({ message: 'Not found' });
    res.json(organization);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(organization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    await Organization.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
};
