const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // MUST run before other requires

const express = require('express');
const app = express();
const http = require('http');
const connectDB = require('../config/database');
const volunteerRouter = require('../routes/volunteer');
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
app.use('/api', volunteerRouter);

app.get('/', (req, res) => res.send('OK'));
connectDB()
  .then(() => {
    console.log('Db connection successful');
    server.listen(process.env.PORT, () => {
      console.log('Server listening on port ' + process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });
