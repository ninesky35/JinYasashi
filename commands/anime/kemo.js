const akaneko = require('nekos.life');
const neko = new akaneko();
module.exports = {
	name: 'kemo',
	aliases: ['kemonomimi'],
	desc: "'Some Humanoids with Animal Things, ya know right?",
	cat: 'anime',
	cooldown: 5,
	run: async (bot, msg, args) => {
		try {
			let img = await neko.sfw.kemonomimi();
			msg.channel.createMessage({
				embed: {
					color: bot.color,
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					description:
						"**kemonomimi... what a difficult word, don't ya think?**",
					image: {
						url: img.url
					},
					timestamp: new Date()
				}
			});
		} catch (e) {
			msg.channel.error(
				"I still don't understand how a kemo command can give an error but yes, error"
			);
		}
	}
};
