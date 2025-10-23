const express = require('express');
const volunteerRouter = express.Router();
const Volunteer = require('../model/volunteer');

volunteerRouter.post('/volunteer', async (req, res) => {
  try {
    const { fullName, emailId, phone, location } = req.body;
    const volunteer = new Volunteer({
      fullName,
      emailId,
      phone,
      location,
    });

    const savedVolunteer = await volunteer.save();

    res.status(200).json(savedVolunteer);
  } catch (err) {
    res.status(401).send({ Error: err.message });
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
