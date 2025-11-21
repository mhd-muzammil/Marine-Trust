const path = require('path');
// import default from './../../client/tailwind.config';
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // MUST run before other requires

const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('../config/database');
const volunteerRouter = require('../routes/volunteer');
const visiterCountRouter = require('../routes/visitorCount');
const { axios } = require('axios');
const { InitializeSocket } = require('../utils/socket');

app.use(
  cors({
    origin: 'http://localhost:8173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
InitializeSocket(server);

const opineRouter = require("../routes/opine");

app.use("/api/opine", opineRouter);

app.use('/api', volunteerRouter);
app.use('/api', visiterCountRouter);


app.get('/', (req, res) => res.send('OK'));
connectDB()
  .then(() => {
    console.log('Db connection successful');
    server.listen(process.env.PORT, () => {
      console.log('Server listening on port ' + process.env.PORT);
      console.log(
        `WebSocket server also running on ws://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });
