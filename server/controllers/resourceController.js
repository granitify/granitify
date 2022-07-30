const Resource = require('../models/ResourceModel');
const { createErr } = require('../utils/utils');

const resourceController = {};

// Example Mongoose find
resourceController.getAllResources = async (req, res, next) => {
  try {
    const dbRes = await Resource.find({});
    res.locals.resources = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'getAllResources',
        type: 'db query error',
        err,
      })
    );
  }

  return next();
};

// Example Mongoose create
resourceController.createResource = async (req, res, next) => {
  const required = ['id', 'user', 'date'];
  const { id, user, date, text, embeds, attachments, score, resources, subject, category } = req.body;

  if (required.some((key) => req.body[key] === undefined)) {
    return next(
      createErr({
        method: 'createResource',
        type: 'data validation error',
        err: 'request body did not include all required fields',
      })
    );
  }

  if (
    typeof id !== 'number' ||
    typeof user !== 'string' ||
    typeof date !== 'number'
  ) {
    return next(
      createErr({
        method: 'createResource',
        type: 'data validation error',
        err: 'request body did contained invalid data',
      })
    );
  }

  try {
    const dbRes = await Resource.create({ id, user, date, text, embeds, attachments, score, resources, subject, category });
    res.locals.newResource = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'createExample',
        type: 'db insert error',
        err,
      })
    );
  }

  return next();
};

module.exports = resourceController;
