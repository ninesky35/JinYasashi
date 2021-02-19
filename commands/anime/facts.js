const randomfact = require('anime-facts');
const duck = require('duckduckgo-images-api');
module.exports = {
	name: 'fact',
	aliases: ['animefact', 'facts'],
	desc: 'Generate anime facts! (5 Being exactly)',
	cat: 'anime',
	cooldown: 15,
	run: async (bot, msg, args) => {
		try {
			let facts = [];
			const img = await duck.image_search({
				query: 'anime confused gif',
				moderate: true
			});
			let r = Math.floor(Math.random() * 10);
			for (let i = 0; i <= 5; i++) {
				facts.push(randomfact.facts());
			}
			msg.channel.createMessage({
				embed: {
					author: {
						name: msg.author.tag,
						icon_url: msg.author.avatarURL
					},
					title: 'Lets see some facts!',
					fields: [
						{
							name: '1# Fact',
							value: '`' + facts[0] + '`'
						},
						{
							name: '2# Fact',
							value: '`' + facts[1] + '`'
						},
						{
							name: '3# Fact',
							value: '`' + facts[2] + '`'
						},
						{
							name: '4# Fact',
							value: '`' + facts[3] + '`'
						},
						{
							name: '5# Fact',
							value: '`' + facts[4] + '`'
						}
					],
					image: {
						url: img[r].image
					},
					footer: {
						text: 'Req by ' + msg.author.username,
						icon_url: msg.author.avatarURL
					},
					color: bot.color,
					thumbnail: {
						url: bot.user.avatarURL
					}
				}
			});
		} catch (e) {
			msg.channel.error(e.message);
		}
	}
};
