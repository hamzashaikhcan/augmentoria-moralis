const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const http = require('http').createServer(app);
const port = 9001;

app.use(cors());

app.use(
	bodyParser.json({
		limit: '50mb',
		extended: true,
	}),
);

app.use(
	bodyParser.urlencoded({
		parameterLimit: 100000,
		extended: true,
		limit: '50mb',
	}),
);

app.get('/health-check', (req, res) => {
	res.send({
		code: 200,
		message: 'All ok',
	});
});

app.use('/api', require('./routes'));

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

http.listen(process.env.PORT || 9001, () => {
	console.clear();
	console.log('Server Running on Port: ' + port);
});
