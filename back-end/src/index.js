const express = require('express');
const cors = require('cors');

const user = require('./routes/user.routes');
const genericError = require('./middlewares/genericError');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'okay' });
});

app.use('/users', user);

app.use(genericError);

module.exports = app;
