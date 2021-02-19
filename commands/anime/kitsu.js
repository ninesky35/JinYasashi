const akaneko = require('akaneko');
module.exports = {
	name: 'kitsune',
	aliases: ['foxgirl', 'kitsu'],
	desc: 'Cant get enough of the nekos? then take Kitsunes!',
	cat: 'anime',
	cooldown: 10,
	run: async (bot, msg, args) => {
		try {
			msg.channel.createMessage({
				embed: {
					color: bot.color,
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					description: '**Kitsune! ( ꈍᴗꈍ)**',
					image: {
						url: await akaneko.foxgirl()
					},
					timestamp: new Date()
				}
			});
		} catch (e) {
			msg.channel.error(
				"Unexpected Error, yeah, *Why would there be errors in a foxgirl command? what's wrong with me?*"
			);
		}
	}
};
