const Eris = require('eris-additions')(require('eris'));
/**
 * Represents a Message
 * @param {string|Object} - message String Message or an embed object
 * @param {Object} - content An Attachment Object
 */
function reply(message, content) {
	this.channel.createMessage(`<@${this.author.id}> ${message}`, content);
}

module.exports = Eris.Message.prototype.reply = reply;
