const router = require('express').Router();
const imageRoutes = require('./imageRoutes');
const { sendResponse } = require('../utilities/Middleware');

router.use('/images', imageRoutes, sendResponse);
module.exports = router;
