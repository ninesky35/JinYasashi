const Eris = require('eris-additions')(require('eris'));
/**
 * @param {number} - ms Miliseconds for deleting the message
 */
function delTime(ms) {
	setTimeout(() => {
		this.delete();
	}, ms);
}

module.exports = Eris.Message.prototype.delTime = delTime;
