const Eris = require('eris-additions')(require('eris'));
/**
 * Represents a Message
 * @param {string} - message String Message
 * @param {Object} - content An Attachment Object
 */
function reply(message, content) {
	this.channel.createMessage(`<@${this.author.id}> ${message}`, content);
}

module.exports = Eris.Message.prototype.reply = reply;
