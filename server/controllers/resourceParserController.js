const { resource } = require("../routes/resource");

const resourceParserController = {

  //parse put request http://localhost:3000/api/resource

  parsePut: async (req, res, next) => {
    
    try{
      
      const msgObject = await req.body[0];
      const keyArr = ["id", "user", "date", "text", "embeds", "attachments", "score", "resources", "subject", "category"];
      const hasKeys = await keyArr.every(key => msgObject.hasOwnProperty(key));
      while(hasKeys === true){
        //const msgObject = await req.body[0];
      /*
      conditionals here checking:
        -If object contains all/only necessarry keys
        -If objects required keys have values
        -If keys value types are correct
      switch(msgObject){
        case (!Object.keys(msgObject).length > 9):
          throw new Error("More keys in object than needed");
        case (!msgObject[id] || typeof msgObject[id] !== "number"):
          throw new Error("Message ID does not exist or is not an integer");
        case ()
      }
      //throw new Error("pass in err here")
      Only when all conditions pass (or dont pass depending on how I set it up) can we continue
      */
      res.locals.createResource = msgObject;
      return next();
      }
      
    } catch (err) {
        return next({
          message: {err: 'Error parsing put request'},
          log: 'Error in resourceParserController.parsePut',
          status: 400,
        });
    }
  },

}

module.exports = resourceParserController;
