const Eris = require('eris-additions')(require('eris'));
/**
 * Represents an error message.
 * @param {string} error - the custom error message
 */
function messageError(error) {
	this.createMessage('Gomen-ne! there was an error!\n' + error);
}

module.exports = Eris.Channel.prototype.error = messageError;
