const mal = require('mal-scraper');
module.exports = {
	name: 'watchlist',
	aliases: ['malwatchlist'],
	desc: 'See the watchlist of a MyAnimeList User',
	cat: 'anime',
	cooldown: 25,
	run: async (bot, msg, args) => {
	try {
		let user = args.join(' ');
		if (!user)
			return msg.channel.createMessage(
				"Sorry Sir, but you didn't write the name of a MyAnimeList User"
			);
		let fields_watchlist = [];
		const res = await mal.getWatchListFromUser(user, 1, 'anime');
		for (let i = 0; i < res.length || i < 26; i++) {
			fields_watchlist.push({
				name: res[i].animeTitle,
				value: res[i].animeNumEpisodes + ' Episodes'
			});
		}
		msg.channel.createMessage({
			embed: {
				color: bot.color,
				author: {
					name: msg.author.username,
					icon_url: msg.author.avatarURL
				},
				title: user + "'s Watchlist",
				fields: fields_watchlist,
				footer: {
					text: 'Req by ' + msg.author.tag,
					icon_url: msg.author.avatarURL
				},
				thumbnail: {
					url: bot.user.avatarURL
				}
			}
		});
	} catch(e) {
	  msg.channel.error("Remember: A MyAnimeList User, not an anime")
	}
	}
};
