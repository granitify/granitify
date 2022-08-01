const { createErr } = require('../utils/utils')

const resourceParserController = {

  parsePut: async (req, res, next) => {
    console.log(`PARSER: resourceParserController.parsePut called`)
    console.log(`PARSER: req.body: ${JSON.stringify(req.body)}`);
    
    try{
      
      const msgObject = await req.body;
      const keyArr = ["id", "user", "date", "text", "embeds", "attachments", "score", "resources", "subject", "category"];
      const hasKeys = keyArr.every(key => msgObject.hasOwnProperty(key));
      console.log(`hasKeys ${hasKeys}`)
      while(hasKeys === true){
        //const msgObject = await req.body;
      /*
      conditionals here checking:
        -If object contains all/only necessarry keys
        -If objects required keys have values
        -If keys value types are correct
      //throw new Error("pass in err here")
      Only when all conditions pass (or dont pass depending on how I set it up) can we continue
      */
          if (Object.keys(msgObject).length > 10) console.log(Object.keys(msgObject).length)//throw new Error("More keys in msgObject than needed");
          if (!msgObject.id || typeof msgObject.id !== "number") throw new Error("No ID given or is not an number");
          if (!msgObject.user || typeof msgObject.user !== "string") throw new Error("No user given or value is not a string");
          if (!msgObject.date || typeof msgObject.date !== "number") throw new Error("No date given or value is not a number");
        res.locals.createResource = msgObject;
        console.log(`PARSER: resourceParserController.parsePut finished`)
        console.log(`PARSER: res.locals.createResource: ${JSON.stringify(res.locals.createResource)}`);
        return next();
      }
    } catch (err) {
        return next(createErr({
          method: 'resourceParserController.parsePut',
          type: `Error in resourceParserController.parsePut`,
          err
        }));
    }
  },

}

module.exports = resourceParserController;