const axios = require('axios');
const duck = require('duckduckgo-images-api');
const uri = 'https://animechanapi.xyz/api/quotes/random';
module.exports = {
	name: 'quote',
	aliases: ['animequote'],
	desc: 'Get a random anime quote.',
	cat: 'anime',
	cooldown: 15,
	run: async (bot, msg, args) => {
		try {
			const json = await axios.get(uri);
			const img = await duck.image_search({
				query: json.data.data[0].character,
				moderate: true
			});

			msg.channel.createMessage({
				embed: {
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					description: json.data.data[0].quote,
					image: {
						url: img[0].image
					},
					color: bot.color,
					footer: { text: json.data.data[0].character },
					timestamp: new Date()
				}
			});
		} catch (e) {
			console.error(e);
			msg.channel.error("I think there was a problem with axios, duckduckgo or the api of the quotes so yeah, Sorry, try again");
		}
	}
};
