const themes = new (require('anime-themes'))();
const getBuffer = require('../../utils/getBuffer');
module.exports = {
	name: 'theme',
	aliases: ['themes'],
	desc: 'Search anime themes in https://themes.moe/',
	cat: 'anime',
	cooldown: 25,
	run: async (bot, msg, args) => {
		if (!args[0])
			return msg.channel.createMessage(
				"Gomen-ne! but you didn't write an anime name"
			);
		try {
			const song = await themes.search(args.join(' '));
			const r = Math.floor(Math.random() * song[0].themes.length);
			const theme = song[0].themes[r].url;
			msg.channel.createMessage(theme);
		} catch (e) {
			msg.channel.createMessage(
				'ERROR! There is no themes in the webpage or the anime is uncorrectly writed, sorry Sir'
			);
		}
	}
};
