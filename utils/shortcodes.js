/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const config = require('../config');

const manifestPath = path.resolve(__dirname, '..', config.dir.output, 'assets/manifest.json');

module.exports = {
  // Allow embedding webpack assets pulled out from `manifest.json`
  // {% webpack "main.css" %}
  webpack: async (name) =>
    new Promise((resolve) => {
      fs.readFile(manifestPath, { encoding: 'utf8' }, (err, data) =>
        resolve(err ? `/assets/${name}` : JSON.parse(data)[name])
      );
    })
};
