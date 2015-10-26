'use strict';

// Module
const express    = require('express'),
  parser         = require('body-parser'),
  React          = require('react'),
  ReactDOMServer = require('react-dom/server');

// Core
const  path = require('path');

// File
const  GroceryItem = require('./models/GroceryItem.js');

let factoryApp;

require('babel/register');  // Process the required jsx files for isomorphic
require('./database.js');

factoryApp = React.createFactory(require('./../app/components/GroceryItemList.jsx'));

let   app = express();

// Make the application isomorphic
app.get('/', (req, res) => {
    //res.render('./../app/index.ejs', {});

    GroceryItem.find((error, doc) => {
      let generated = ReactDOMServer.renderToString(factoryApp({
         items : doc
      }));

      res.render('./../app/index.ejs', {reactOutput : generated});
    });
})
.use(express.static(path.join(__dirname, '/../.tmp')))
.listen(7777);

app.use(parser.json());
app.use(parser.urlencoded({extended : false}));

require('./routes/items.js')(app);
