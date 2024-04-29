const express = require('express');
const usersRouter = require('./users.router');
const contentRouter = require('./content.router');
const categoryRouter = require('./category.router');
const profileRouter = require('./profile.router');
const contentTypesRouter = require('./contentType.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user', usersRouter);
    router.use('/content', contentRouter);
    router.use('/category', categoryRouter);
    router.use('/profile', profileRouter);
    router.use('/contentType', contentTypesRouter);
}

module.exports = routerApi;
