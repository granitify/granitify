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
  console.log(`DB: resourceController.createResource called`)
  console.log(`DB: res.locals: ${JSON.stringify(res.locals)}`)

  const required = ['id', 'user', 'date'];
  const { id, user, date, text, embeds, attachments, score, resources, subject, category } = res.locals.createResource;

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
        err: 'request body contained invalid data',
      })
    );
  }
  try {
    const dbRes = await Resource.create({ id, user, date, text, embeds, attachments, score, resources, subject, category });
    res.locals.newResource = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'db create',
        type: 'db insert error',
        err,
      })
    );
  }
  return next();
};

resourceController.deleteResource = async (req, res, next) => {
  const required = ['id'];
  const { id } = res.locals.deleteResource;

  if (required.some((key) => req.body[key] === undefined)) {
    return next(
      createErr({
        method: 'deleteResource',
        type: 'data validation error',
        err: 'request body did not include all required fields',
      })
    );
  }
  if (
    typeof id !== 'number'
  ) {
    return next(
      createErr({
        method: 'deleteResource',
        type: 'data validation error',
        err: 'request body contained invalid data',
      })
    );
  }
  try {
    // const dbRes = await Resource.deleteOne({ id: id });
    const dbRes = await Resource.findOneAndDelete({ id: id });
    console.log('***LOGGING dbRes, should show DELETED object: ', dbRes);
    res.locals.deletedEntry = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'db findOneAndDelete',
        type: 'db findOneAndDelete error',
        err,
      })
    );
  }
  return next();
};

resourceController.updateResource = async (req, res, next) => {
  const required = ['id'];
  const { id, user, date, text, embeds, attachments, score, resources, subject, category } = res.locals.oldResource;
  const { idUpdated, userUpdated, dateUpdated, textUpdated, embedsUpdated, attachmentsUpdated, scoreUpdated, resourcesUpdated, subjectUpdated, categoryUpdated } = res.locals.newResource;

  if (required.some((key) => req.body[key] === undefined)) {
    return next(
      createErr({
        method: 'updateResource',
        type: 'data validation error',
        err: 'request body did not include all required fields',
      })
    );
  }
  if (
    typeof id !== 'number'
  ) {
    return next(
      createErr({
        method: 'updateResource',
        type: 'data validation error',
        err: 'request body contained invalid data',
      })
    );
  }
  try {
    // const dbRes = await Resource.create({ id, user, date, text, embeds, attachments, score, resources, subject, category });
    const dbRes = await Resource.findOneAndUpdate({ id: id }, { text: textUpdated, embeds: embedsUpdated, attachments: attachmentsUpdated, score: scoreUpdated, resources: resourcesUpdated, subject: subjectUpdated, category: categoryUpdated }, {new: true});
    console.log('***LOGGING dbRes, should show UPDATED object: ', dbRes);
    res.locals.updatedEntry = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'db findOneAndUpdate',
        type: 'db update error',
        err,
      })
    );
  }
  return next();
};

module.exports = resourceController;
