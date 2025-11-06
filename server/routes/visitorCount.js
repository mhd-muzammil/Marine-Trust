const express = require('express');
const visitorCountRouter = express.Router();
const VisitorCountModel = require('../model/visitorCount');
const { getIo } = require('../utils/socket');

visitorCountRouter.get('/', async (req, res, next) => {});

visitorCountRouter.post('/stats/increment', async (req, res) => {
  try {
    const updatedCount = await VisitorCountModel.findOneAndUpdate(
      {},
      {
        $inc: { visitorCount: 1 },
      },
      {
        upsert: true,
        new: true,
      }
    );
    getIo().emit('visitorCount', updatedCount.visitorCount);
    res.status(200).json({
      visitorCount: updatedCount.visitorCount,
      message: 'liveCountUpdated',
    });
  } catch (err) {
    res.status(500).send({
      Error: 'Failed to increment visitor Counter ',
      Details: err.message,
    });
  }
});

visitorCountRouter.get('/stats/getVisitors', async (req, res) => {
  try {
    const stats = await VisitorCountModel.findOne({});
    const count = stats ? stats.visitorCount : 0;
    res.status(200).send({ count });
  } catch (err) {
    res.status(500).send({ Error: 'Failed to get the visitors Count', err });
  }
});

module.exports = visitorCountRouter;
