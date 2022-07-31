const { resource } = require("../routes/resource");

const resourceParserController = {

  //parse put request http://localhost:3000/api/resource

  parsePut: async (req, res, next) => {
    
    try{
      const msgObject = await req.body[0];
      /*
      conditionals here checking:
        -If object contains all necessarry keys
        -If objects required keys have values
        -If keys value types are correct
      switch(msgObject){
        case "error case":
          throw error
      }
      //throw new Error("pass in err here")
      Only when all conditions pass (or dont pass depending on how I set it up) can we continue
      */
      res.locals.createResource = msgObject;
      return next();
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
