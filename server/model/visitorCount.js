const mongoose = require('mongoose');

const visitorCountSchema = new mongoose.Schema({
  visitorCount: {
    type: Number,
    default: 0,
  },
});

const VisitorCountModel = mongoose.model('VisitorCount', visitorCountSchema);

module.exports = VisitorCountModel;
