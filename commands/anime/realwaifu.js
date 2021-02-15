const fetch = require('node-fetch');
module.exports = {
	name: 'waifu',
	aliases: [],
	desc: 'Get an Image of Waifu! (A "real" waifu, not created by AI)',
	cat: 'anime',
	cooldown: 5,
	run: async (bot, msg, args) => {
		const data = await fetch('https://waifu.pics/api/sfw/waifu');
		const img = await data.json();
		msg.channel.createMessage({
			embed: {
				color: bot.color,
				author: {
					name: msg.author.username,
					icon_url: msg.author.avatarURL
				},
				title: 'Waaa~ ii~~ fuuuu~',
				image: {
					url: img.url
				},
				timestamp: new Date(),
				thumbnail: {
					url: img.url
				}
			}
		});
	}
};
