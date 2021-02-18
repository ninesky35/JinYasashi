module.exports = {
	name: 'aiwaifu',
	aliases: ['doesnotexist'],
	desc:
		'Get a random Waifu created by an AI from https://www.thiswaifudoesnotexist.net/',
	cat: 'anime',
	cooldown: 7,
	run: async (bot, msg, args) => {
		let id = Math.floor(Math.random() * 10000);
		try {
			let img = 'https://www.thiswaifudoesnotexist.net/example-' + id + '.jpg';

			msg.channel.createMessage({
				embed: {
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					description: 'This Waifu **DOES NOT EXIST!**',
					image: {
						url: img
					},
					footer: {
						text: 'Waifu created by an AI | www.thiswaifudoesnotexist.net'
					},
					color: bot.color,
					timestamp: new Date()
				}
			});
		} catch (e) {
			console.log(e.stack);
			return msg.channel.createMessage(
				'An unexpected error ocurred! Gomen-ne Sir!'
			);
		}
	}
};
