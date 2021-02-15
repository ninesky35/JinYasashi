const human = require('humanize-duration');
module.exports = {
	name: 'help',
	aliases: ['halp', 'h', 'ayuda'],
	desc: 'Basic Information!',
	cat: 'misc',
	cooldown: 10,
	run: async (bot, msg, args, prefix) => {
		try {
			msg.channel.createMessage({
				embed: {
					color: bot.color,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					thumbnail: { url: bot.user.avatarURL },
					title:
						"Hello! Watashi wa Jin! I'm your new friend who will help you in everything related to weeb stuff! and other things...!",
					fields: [
						{
							name: 'Prefix in this server',
							value:
								prefix +
								'\n you can change it with ' +
								prefix +
								'setprefix [New Prefix]'
						},
						{
							name: 'To see my commands',
							value: prefix + 'commands'
						},
						{
							name: 'Servers',
							value: bot.guilds.size
						},
						{
							name: 'Uptime',
							value: human(bot.uptime)
						},
						{
							name: 'Invite me',
							value:
								'[I know you want to invite me!](https://discord.com/oauth2/authorize?client_id=809938925937491989&scope=bot&permissions=67488832)'
						},
						{
							name: 'Credits',
							value:
								'Creator: **Over#7073**\nDeveloper: **KO_ver2#8529**\nIcon: [BulzyKrown](https://instagram.com/bulzykrown)'
						}
					],
					footer: {
						text: 'Req by ' + msg.author.username,
						icon_url: msg.author.avatarURL
					}
				}
			});
		} catch (e) {
			msg.channel.error(
				"Hehe~ Unexpected Error...? *Why could there be an error in the help command, what's wrong...?*"
			);
		}
	}
};
