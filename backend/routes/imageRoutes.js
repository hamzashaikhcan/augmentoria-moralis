const express = require('express');
var router = express.Router();

const { imageController } = require('../controller');
const bodyParser = require('body-parser');

const multer = require('multer');

const storage = multer.diskStorage({
	destination: './assets',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1000000,
	},
}).single('image');

var urlencodedParser = bodyParser.urlencoded({
	limit: '100mb',
	extended: false,
});

router.post('/', async (req, res, next) => {
	await imageController.uploadImage(req, res);
});

module.exports = router;
