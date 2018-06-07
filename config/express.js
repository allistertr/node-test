let express = require('express');
let consign = require('consign');
let path = require('path');
let cors = require('cors');
let homeDirectory = path.join(__dirname, '..', 'app');

let app = express();

app.use(cors());

consign({ cwd: homeDirectory })
  .include('api')
  .then('routes')
  .into(app);

module.exports = app;