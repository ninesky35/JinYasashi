module.exports = {
	name: 'catSays',
	aliases: ['catas', 'catsays'],
	desc: 'An image of a Cat with a text that you input',
	cat: 'images',
	cooldown: 5,
	run: async (bot, msg, args) => {
		if (!args[0]) return msg.channel.createMessage('You had to input a text!');
		let link = `https://cataas.com/cat/cute/says/${args.join('%20')}`;
		try {
			msg.channel.createMessage({
				embed: {
					color: bot.color,
					description: '**CAT!**',
					image: {
						url: link
					},
					footer: {
						text: 'Req. by ' + msg.author.username
					},
					timestamp: new Date()
				}
			});
		} catch (e) {
			return msg.channel.error('Error! ERROR! (Fire! Fire!)');
		}
	}
};
