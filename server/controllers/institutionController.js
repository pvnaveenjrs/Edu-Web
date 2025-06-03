const Institution = require('../models/Institution');
const path = require('path');
const fs = require('fs');

// Create institution
const createInstitution = async (req, res) => {
  try {
    const { name, address, contactNumber, email } = req.body;
    let logoPath = null;

    if (req.file) {
      logoPath = req.file.filename; // multer saves with filename in uploads folder
    }

    const institution = new Institution({
      name,
      address,
      contactNumber,
      email,
      logo: logoPath
    });

    await institution.save();
    res.status(201).json(institution);
  } catch (error) {
    console.error('Create institution error:', error);
    res.status(500).json({ message: 'Server error while creating institution' });
  }
};

// Get all institutions
const getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find().sort({ createdAt: -1 });
    res.json(institutions);
  } catch (error) {
    console.error('Get institutions error:', error);
    res.status(500).json({ message: 'Server error fetching institutions' });
  }
};

// Get institution by ID
const getInstitutionById = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) return res.status(404).json({ message: 'Institution not found' });
    res.json(institution);
  } catch (error) {
    console.error('Get institution error:', error);
    res.status(500).json({ message: 'Server error fetching institution' });
  }
};

// Update institution by ID
const updateInstitution = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) return res.status(404).json({ message: 'Institution not found' });

    const { name, address, contactNumber, email } = req.body;

    if (req.file) {
      // Delete old logo file if exists
      if (institution.logo) {
        const oldPath = path.join(__dirname, '../uploads/', institution.logo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      institution.logo = req.file.filename;
    }

    institution.name = name || institution.name;
    institution.address = address || institution.address;
    institution.contactNumber = contactNumber || institution.contactNumber;
    institution.email = email || institution.email;

    await institution.save();

    res.json(institution);
  } catch (error) {
    console.error('Update institution error:', error);
    res.status(500).json({ message: 'Server error updating institution' });
  }
};

// Delete institution by ID
const deleteInstitution = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) return res.status(404).json({ message: 'Institution not found' });

    if (institution.logo) {
      const logoPath = path.join(__dirname, '../uploads/', institution.logo);
      if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
    }

    await institution.deleteOne();
    res.json({ message: 'Institution deleted successfully' });
  } catch (error) {
    console.error('Delete institution error:', error);
    res.status(500).json({ message: 'Server error deleting institution' });
  }
};

module.exports = {
  createInstitution,
  getInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution
};
