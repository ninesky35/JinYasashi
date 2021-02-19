module.exports = {
	name: 'reportbug',
	aliases: ['bugreport'],
	desc: 'Report a bot bug',
	cat: 'misc',
	cooldown: 15,
	run: (bot, msg, args) => {
		if (!args.length)
			return msg.channel.createMessage(
				'You have to input the description of the bug/error, If you want you can attach an image of the error, detail as much as you can'
			);
		msg.channel.createMessage('Report sent!');
		bot.createMessage('812336610800566332', {
			embed: {
				color: bot.color,
				thumbnail: {
					url: msg.guild.iconURL
				},
				title: 'Bug Reported',
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
