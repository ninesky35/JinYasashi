const wtf = require('wtf_wikipedia');
const duck = require('duckduckgo-images-api');
module.exports = {
	name: 'narutopedia',
	aliases: ['wikiruto', 'narutowiki'],
	desc: 'Get information from Narutopedia',
	cat: 'anime',
	cooldown: 15,
	run: async (bot, msg, args) => {
		let search = args.join('_');
		if (!search)
			return msg.channel.createMessage(
				"Sorry Sir, but you didn't write your search"
			);
		let doc = await wtf.fetch('https://naruto.fandom.com/wiki/' + search);
		const img = await duck.image_search({
			query: doc.json().title,
			moderate: true
		});
		let sentences = [];
		for (
			let i = 0;
			i < doc.json().sections[0].paragraphs[0].sentences.length;
			i++
		) {
			sentences.push(doc.json().sections[0].paragraphs[0].sentences[i].text);
		}
		msg.channel.createMessage({
			embed: {
				color: bot.color,
				author: {
					name: msg.author.username,
					icon_url: msg.author.avatarURL
				},
				title: doc.json().title,
				description: sentences.join(' ').slice(0, 2048),
				image: {
					url: img[0].image
				},
				footer: {
					text: 'Req by ' + msg.author.username,
					icon_url: msg.author.avatarURL
				}
			}
		});
	}
};
