const fetch = require('node-fetch');
/**
 * @param {string} url Absolute URL of an Image
 */
module.exports = function(url) {
	return fetch(url)
		.then(x => x.buffer())
		.catch(e => console.error(e));
};
