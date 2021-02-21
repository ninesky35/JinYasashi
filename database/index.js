const mongo = require('mongoose');
mongo
	.connect(
		process.env.MONGO_URI,
		{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
	)
	.then(db => {
		console.log('Base de datos conectada.');
	});
