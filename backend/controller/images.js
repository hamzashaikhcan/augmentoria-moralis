const express = require('express');

let axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');

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

module.exports = {
	uploadImage: async (req, res) => {
		try {
			const MORALIS_URL =
				'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder';
			await upload(req, res, async (error) => {
				const file = req.file;
				if (!file) {
					console.log('No Image Found');
					throw new Error('Please select Image File => ' + error);
				} else {
					const filePath = req.file.path;
					let ipfsArray = [];
					ipfsArray.push({
						path: filePath,
						content: fs.readFileSync(filePath, { encoding: 'base64' }),
					});
					const resp = await axios.post(MORALIS_URL, ipfsArray, {
						headers: {
							'X-API-KEY':
								'UF8nn7E4jJGwvBLHvVo4Q0580YHKbA7Xon8QiUGCv5unJPS43hPOtWqMxVKFPzB6',
							'Content-Type': 'application/json',
							accept: 'application/json',
						},
					});
					console.log('RESPONSE DATA => ', resp.data);
					res.send({
						status: 200,
						data: resp.data[0].path,
					});
				}
			});
		} catch (err) {
			console.error('ERROR while uploading image => ', err);
			res.status(200).json({ error: err.message });
		}
	},
};
