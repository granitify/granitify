const axios = require('axios');

const archiver = {};

archiver.send = async (message) => {
  try {
    const result = await axios.put( 'http://localhost:3000/api/resource', message );
    console.log(`Archiver: Successfully sent message to API ${result.status} ${result.stausText}`)
    return result;
  } catch (err) {
    console.error(`Archiver: Failed to send message to API: `, err);
    return err;
  }
};

module.exports = archiver;
