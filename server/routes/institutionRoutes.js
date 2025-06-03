const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const {
  createInstitution,
  getInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution
} = require('../controllers/institutionController');

const multer = require('multer');
const path = require('path');

// Multer config for file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) cb(null, true);
  else cb(new Error('Only images are allowed'));
};

const upload = multer({ storage, fileFilter });

router.get('/', authMiddleware, getInstitutions);
router.post('/', authMiddleware, upload.single('logo'), createInstitution);
router.get('/:id', authMiddleware, getInstitutionById);
router.put('/:id', authMiddleware, upload.single('logo'), updateInstitution);
router.delete('/:id', authMiddleware, deleteInstitution);

module.exports = router;
