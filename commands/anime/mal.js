const mal = require('mal-scraper');
module.exports = {
	name: 'anime',
	aliases: ['mal'],
	desc: 'Search Animes!',
	cat: 'anime',
	cooldown: 20,
	run: async (bot, msg, args) => {
		try {
			let name = args.join(' ');
			if (!name)
				return msg.channel.createMessage(
					"Gomen-ne! but you didn't write the name of an anime or manga to search"
				);
			const data = await mal.getInfoFromName(name);

			msg.channel.createMessage({
				embed: {
					color: bot.color,
					title: data.title,
					description: data.synopsis ? data.synopsis.slice(0, 2048) : '\u200b',
					image: {
						url: data.picture ? data.picture : '\u200b'
					},
					footer: {
						text: 'Req by ' + msg.author.tag,
						icon_url: msg.author.avatarURL
					}
				}
			});
		} catch (e) {
			msg.channel.error(
				'Remember: the name of an anime, preferably in romaji but in english it should also work'
			);
		}
	}
};
