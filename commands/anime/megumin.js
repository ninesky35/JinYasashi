const fetch = require('node-fetch');
module.exports = {
	name: 'megumin',
	aliases: ['exprosion'],
	desc: 'Get an Image of Megumin!',
	cat: 'anime',
	cooldown: 10,
	run: async (bot, msg, args) => {
		const data = await fetch('https://waifu.pics/api/sfw/megumin');
		const img = await data.json();
		msg.channel.createMessage({
			embed: {
				color: bot.color,
				author: {
					name: msg.author.username,
					icon_url: msg.author.avatarURL
				},
				title: 'Your Favorite Explosive Loli!',
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
