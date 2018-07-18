const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const errorHandler = require('./lib/errorHandler');

const routes = require('./config/routes');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI, port } = require('./config/environment');

mongoose.connect(dbURI);

app.use(bodyParser.json({
  limit: '500kb'
}));
app.use('/api', routes);
app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// app.use(errorHandler);

app.listen(port, () => console.log(`Up and running on port ${port}`));
