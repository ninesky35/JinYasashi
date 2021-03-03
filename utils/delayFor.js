const Eris = require('eris-additions')(require('eris'));
/**
 * Represents a Timeout
 * @param {string} - ms Amount of time in Milliseconds
 */
function delayFor(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

module.exports = Eris.Client.prototype.delayFor = delayFor;
