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
  id: { type: Number, required: true },
  user: { type: String, required: true },
  date: { type: Date, required: true},
  text: { type: String },
  embeds: [Object],
  attachments: [Object],
  score: { type: Number },
  resources: { linkUrls: [String], imageUrls: [String], codeSnippets: [String] },
  subject: { type: String },
  category: { type: String }
});

const Resource = mongoose.model('Resource', resourceSchema);

// You must export your model through module.exports

module.exports = Resource;
