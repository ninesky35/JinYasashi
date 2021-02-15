const akaneko = require('akaneko');
module.exports = {
	name: 'neko',
	aliases: ['catgirl'],
	desc: 'Lets see some Nekos!',
	cat: 'anime',
	cooldown: 5,
	run: async (bot, msg, args) => {
		try {
			msg.channel.createMessage({
				embed: {
					color: bot.color,
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					title: "Here's your Neko!",
					image: {
						url: await akaneko.neko()
					},
					timestamp: new Date()
				}
			});
		} catch (e) {
			msg.channel.error(
				'Idk why an error could ocurr in a neko command but Unexpected! hehe'
			);
		}
	}
};
