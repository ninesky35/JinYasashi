const Eris = require('eris-additions')(require('eris'));
/**
 * @param {Boolean} nsfw - the value of the parameter nsfw of a channel
 */
function setNSFW(nsfw) {
	try {
		this.edit({
			nsfw: nsfw
		});
	} catch (e) {
		this.error('\u200b');
	}
}

module.exports = Eris.Channel.prototype.setNSFW = setNSFW;
