
const resourceParserController = {

  parsePut: async (req, res, next) => {
    
    try{
      
      const msgObject = await req.body;
      const keyArr = ["id", "user", "date", "text", "embeds", "attachments", "score", "resources", "subject", "category"];
      const hasKeys = keyArr.every(key => msgObject.hasOwnProperty(key));
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
        switch(msgObject){
          case (Object.keys(msgObject).length > 9):
            throw new Error("More keys in msgObject than needed");
          case (!msgObject[id] || typeof msgObject[id] !== "number"):
            throw new Error("No ID given or is not an number");
          case (!msgObject[user] || typeof msgObject[user] !== "string"):
            throw new Error("No user given or value is not a string");
          case (!msgObject[date] || typeof msgObject[date] !== "number"):
            throw new Error("No date given or value is not a number");
        }
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