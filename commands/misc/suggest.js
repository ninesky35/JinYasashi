module.exports = {
name: 'botsuggest',
	aliases: ['suggest'],
	desc: 'Suggest something for the bot.',
	cat: 'misc',
	cooldown: 6,
	run: (bot, msg, args) => {
		if (!args.length)
			return msg.channel.createMessage(
				'You have to input the description of the suggestion, If you want you can attach an image as an example, detail as much as you can'
			);
		msg.channel.createMessage('Suggestion sent!');
		bot.createMessage('812336637248798780', {
			embed: {
				color: bot.color,
				thumbnail: {
					url: msg.guild.iconURL
				},
				title: 'Suggestion received!',
				description: `Author:\n> ${msg.author.tag} (${
					msg.author.id
				})\nDescription:\n> ${args.join(' ')}\nGuild:\n> ${msg.guild.name}`,
				image: {
					url: msg.attachments[0] ? msg.attachments[0].proxy_url : null
				},
				timestamp: new Date()
			}
		});
	}
};
