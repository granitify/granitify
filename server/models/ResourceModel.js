const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const MONGO_URI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../secrets.json'))).MONGO_URI;

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'starwars'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const Schema = mongoose.Schema;

const resourceSchema = new mongoose.Schema({
  id: { type: Number, required: true }
  text: { type: String },
  user: { type: String, required: true },
  date: { type: Date, required: true},
  attachments: { type: undefined },
  score: { type: Number },
  embed: { type: Object },
  subject: { type: String },
  category: { type: String },
  resource: { type: Object, { url: Object, image: Object, code: Object } },

});

const Resource = mongoose.model('Resource', resourceSchema);

// You must export your model through module.exports

module.exports = Resource;
