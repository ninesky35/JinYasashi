let fetch = require('node-fetch');
module.exports = {
	name: 'surprise',
	aliases: ['surpriseme', 'randomanime'],
	desc:
		'Get a random anime of MyAnimeList, maybe you could find your new favorite anime!',
	cat: 'anime',
	cooldown: 30,
	run: async (bot, msg, args) => {
		try {
			const r = Math.floor(Math.random() * 10000);
			const res = await fetch(
				'https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=' +
					r
			);
			const json = await res.json();
			const r2 = Math.floor(Math.random() * 10);
			const data = json.data[r2].attributes;
			msg.channel.createMessage({
				embed: {
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					color: bot.color,
					title:
						'There are many animes in the world, what if you give this one a try?',
					description:
						'**Name**\n' +
						data.titles.en_jp +
						'\n\n**Synopsis** (Marked as a spoiler in case you want to know nothing hehe)\n||' +
						data.synopsis.slice(0, 1800) +
						'||',
					image: {
						url: data.posterImage.medium
					},
					footer: {
						text: 'Req by ' + msg.author.tag,
						icon_url: msg.author.avatarURL
					}
				}
			});
		} catch (e) {
			console.error(e.stack);
			return msg.channel.error(
				'Unexpected Error, I think is a problem with the kitsu.io API'
			);
		}
	}
};
