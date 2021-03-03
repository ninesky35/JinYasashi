const Eris = require('eris-additions')(require('eris'));
/**
 * Represents a Message
 * @param {string} - user name of a user
 */
function sendNudes(user) {
	this.channel.createMessage(`${user}, ${this.author.username} te pide que le mandes nudes, yo no, el (•﹏•)`);
}

module.exports = Eris.Message.prototype.sendNudes = sendNudes;
