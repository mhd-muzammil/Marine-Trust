const express = require('express');
const volunteerRouter = express.Router();
const Volunteer = require('../model/volunteer');

volunteerRouter.post('/volunteer', async (req, res) => {
  try {
    const {
      fullName,
      emailId,
      phone,
      availability,
      location,
      role,
      interestsCleanup,
      interestsRestoration,
      interestsEducation,
    } = req.body;
    const volunteer = new Volunteer({
      fullName,
      emailId,
      phone,
      availability,
      location,
      role,
      interestsCleanup,
      interestsRestoration,
      interestsEducation,
    });

    const savedVolunteer = await volunteer.save();

    res.status(200).json(savedVolunteer);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    res.status(500).send({ message: err.message });
  }
});

volunteerRouter.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();

    res.status(200).json({
      total: volunteers.length,
      data: volunteers,
    });
  } catch (err) {
    res.status(401).send({ 'Error fetching volunteers': err.message });
  }
});
module.exports = volunteerRouter;
