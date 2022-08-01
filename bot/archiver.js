const axios = require('axios');

const archiver = {};

archiver.send = async (message) => {
  try {
    const result = await axios.put( 'http://localhost:3000/api/resource', message );
    return result;
  } catch (err) {
    console.error(`Archiver: Failed to send message to API: `, err);
    return err;
  }
};

module.exports = archiver;
