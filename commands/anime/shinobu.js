const fetch = require('node-fetch');
module.exports = {
	name: 'shinobu',
	aliases: ['oshino'],
	desc: 'Get an Image of Shinobu Oshino! (from Bakemonogatari)',
	cat: 'anime',
	cooldown: 5,
	run: async (bot, msg, args) => {
		const data = await fetch('https://waifu.pics/api/sfw/shinobu');
		const img = await data.json();
		msg.channel.createMessage({
			embed: {
				color: bot.color,
				author: {
					name: msg.author.username,
					icon_url: msg.author.avatarURL
				},
				description: '**What a cute Vampire! dont ya think?**',
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
