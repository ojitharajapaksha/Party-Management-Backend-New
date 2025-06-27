const Individual = require('../models/individual.model.js');
const bcrypt = require('bcryptjs');

const createIndividual = async (req, res) => {
  try {
    const {
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      phone,
      agreeToTerms,
      subscribeToNewsletter,
      ...otherData
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ 
        error: 'Missing required fields: firstName, lastName, email, and phone are required' 
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

    // Check if user already exists
    const normalizedEmail = email.toLowerCase().trim();
    
    console.log('Checking for existing individual with email:', normalizedEmail);
    
    const existingIndividual = await Individual.findOne({
      $or: [
        { 'contactMedium.characteristic.emailAddress': normalizedEmail },
        { email: normalizedEmail }
      ]
    });

    console.log('Existing individual found:', existingIndividual ? 'Yes' : 'No');

    if (existingIndividual) {
      console.log('Existing individual details:', {
        id: existingIndividual._id,
        email: existingIndividual.email,
        contactMedium: existingIndividual.contactMedium
      });
      return res.status(400).json({ 
        error: 'An account with this email already exists' 
      });
    }

    // Prepare individual data with proper mapping
    const individualData = {
      givenName: firstName,
      familyName: lastName,
      fullName: `${firstName} ${lastName}`,
      formattedName: `${firstName} ${lastName}`,
      legalName: `${firstName} ${lastName}`,
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
      email: normalizedEmail, // For easy querying
      phone: phone,
      agreeToTerms: agreeToTerms,
      subscribeToNewsletter: subscribeToNewsletter,
      accountCreationDate: new Date(),
      ...otherData
    };

    // Hash password if provided
    if (password) {
      const saltRounds = 10;
      individualData.hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const individual = new Individual(individualData);
    await individual.save();

    // Remove sensitive data from response
    const responseData = individual.toObject();
    delete responseData.hashedPassword;

    res.status(201).json({
      success: true,
      message: 'Individual account created successfully',
      data: responseData
    });
  } catch (err) {
    console.error('Error creating individual:', err);
    res.status(400).json({ 
      error: err.message || 'Failed to create individual account'
    });
  }
};

const getIndividuals = async (req, res) => {
  try {
    const individuals = await Individual.find().select('-hashedPassword');
    console.log(`Found ${individuals.length} individuals in database`);
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

// Debug endpoint to check if email exists
const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.params;
    const normalizedEmail = email.toLowerCase().trim();
    
    const individual = await Individual.findOne({
      $or: [
        { 'contactMedium.characteristic.emailAddress': normalizedEmail },
        { email: normalizedEmail }
      ]
    }).select('-hashedPassword');
    
    res.status(200).json({
      exists: !!individual,
      email: normalizedEmail,
      individual: individual
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createIndividual,
  getIndividuals,
  getIndividualById,
  updateIndividual,
  deleteIndividual,
  checkEmailExists
};
