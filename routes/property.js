const express = require('express');
const multer = require('multer');
const Property = require('../models/propertiesModel');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Create a new property with file upload


router.post('/properties', upload.single('image'), async (req, res) => {
    const {
        location,
        description,
        rent,
        deposit,
        builtupArea,
        furnishing,
        apartmentType,
        preferredTenants,
        userId
    } = req.body;

    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded.' });
    }

    const imagePath = req.file.path; // Path of the uploaded file

    try {
        const property = new Property({
            imagePath,
            location,
            description,
            rent,
            deposit,
            builtupArea,
            furnishing,
            apartmentType,
            preferredTenants,
            userId
        });
        await property.save();
        res.status(201).send(property);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all properties for a specific user
router.get('/properties/user/:userId', async (req, res) => {
    try {
        const properties = await Property.find({ userId: req.params.userId });
        res.status(200).send(properties);
    } catch (error) {
        res.status(500).send(error);
    }
});

//To get all properties
router.get('/properties', async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).send(properties);
    } catch (error) {
        res.status(500).send(error);
    }
});

//To get details of specific property
router.get('/properties/rent/:id', async (req, res) => {
    try {
        const properties = await Property.findById(req.params.id);
        res.status(200).send(properties);
    } catch (error) {
        res.status(500).send(error);
    }
});


//To delete a property
router.delete('/property/:id', async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      await Property.findByIdAndDelete(req.params.id);
      res.json({ message: 'Property deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });



router.put('/property/:id', upload.single('file'), async (req, res) => {
    try {
      const updatedData = {
        description: req.body.description,
        location: req.body.location,
        rent: req.body.rent,
        deposit: req.body.deposit,
        builtupArea: req.body.builtupArea,
        furnishing: req.body.furnishing,
        apartmentType: req.body.apartmentType,
        preferredTenants: req.body.preferredTenants,
      };
  
      if (req.file) {
        updatedData.imagePath = req.file.path;
      }
  
      const property = await Property.findByIdAndUpdate(req.params.id, updatedData, { new: true });
      
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.json(property);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
