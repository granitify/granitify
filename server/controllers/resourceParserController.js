
const resourceParserController = {

  //parse put request http://localhost:3000/api/resource

  parsePut: async (req, res, next) => {
    
    try{

        
      res.locals.newResource = newResource;
      return next();
    } catch (err) {
        return next({
          message: {err: 'Error parsing put request'},
          log: 'Error in resourceParserController'
        });
    }
  },

}