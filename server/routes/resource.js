const Router = require('express');
// const exampleController = require('../controllers/exampleController');

const router = Router();
const resourceParserController = require('../controllers/resourceParserController');
const resourceController = require('../controllers/resourceController');
// https://www.restapitutorial.com/lessons/restquicktips.html

router.use((req, res, next) => {
  console.log(`server/routes/${__filename}.js: received request ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
  next();
});

router.put('/', (req, res, next) => {
    console.log(`server/routes/${__filename}.js.router.put('/'): received request ${req.method} ${req.url}`);
    next();
  },
  resourceParserController.parsePut,
  resourceController.createResource,
  (req, res) => {
    res.status(200).json(res.locals.newResource);
  }
);

router.get('/', (req, res, next) => {
    console.log(`server/routes/${__filename}.js.router.get('/'): received request ${req.method} ${req.url}`);
    next();
  },
  resourceController.getAllResources,
  (req, res) => {
    res.status(200).json(res.locals.resources);
  }
);

// api router 404 handler
router.use((req, res) => {
  console.log(`server/routes/${__filename}.js: handler not found for request ${req.method} ${req.url}`);
  res
    .status(404)
    .json({
      message: `API handler for ${req.method} ${req.url} not found`,
    });
});

module.exports = router;