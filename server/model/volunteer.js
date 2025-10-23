const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
    },
    emailId: {
      type: String,
      unique: true,
      required: [true, 'emailId is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      dafault: '+91 XXXXX XXXXX',
    },
    location: {
      type: String,
      required: [true, 'location is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const VolunteerModel = mongoose.model('Volunteer', volunteerSchema);

module.exports = VolunteerModel;
