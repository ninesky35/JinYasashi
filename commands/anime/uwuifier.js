const { Uwuifier } = require('uwuifier');
const uwu = new Uwuifier();
module.exports = {
	name: 'uwuify',
	aliases: ['uwuifier', 'uwufy', 'uwu'],
	desc: 'Uwuify any owo sentence',
	cat: 'anime',
	cooldown: 5,
	run: async (bot, msg, args) => {
		try {
			if (!args[0])
				return msg.channel.createMessage(
					"Gomen-ne! but you didn't write the sentence to uwuify"
				);
			msg.channel.createMessage('`' + uwu.uwuifySentence(args.join(' ')) + '`');
		} catch (e) {
			msg.channel.error(
				'Idk why an error could occur here but yeah, unexpected error'
			);
		}
	}
};
