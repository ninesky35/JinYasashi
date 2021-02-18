const cmdlist = require('../../utils/cmdlist'),
	cmdn = require('../../utils/cmdnumber');
module.exports = {
	name: 'commands',
	aliases: ['cmds', 'command', 'cmd'],
	desc: 'See My Commands, information and that stuff!',
	cat: 'misc',
	cooldown: 10,
	run: async (bot, msg, args, prefix) => {
		try {
			let cmd =
				bot.commands.get(args[0]) ||
				bot.commands.find(x => x.aliases.includes(args[0]));
			let cmds =
				bot.commands.size - bot.commands.filter(z => z.cat == 'devs').length;

			if (!cmd) {
				msg.channel.createMessage({
					embed: {
						color: bot.color,
						author: { name: bot.user.username, icon_url: bot.user.avatarURL },
						title:
							"Here's the list of my commands! I have [" + cmds + '] Commands',
						thumbnail: { url: bot.user.avatarURL },
						fields: [
							{
								name: 'Anime [' + cmdn(bot, 'anime') + ']',
								value: cmdlist(bot, 'anime')
							},
							{
								name: 'Misc [' + cmdn(bot, 'misc') + ']',
								value: cmdlist(bot, 'misc')
							}
						],
						footer: {
							text:
								'Use ' +
								prefix +
								'cmd [command] to see more information about a command | Req by ' +
								msg.author.tag,
							icon_url: msg.author.avatarURL
						},
						timestamp: new Date()
					}
				});
			} else {
				let aliases = cmd.aliases.length
					? `[${cmd.aliases.join(', ')}]`
					: "Doesn't have!";
				msg.channel.createMessage({
					embed: {
						color: bot.color,
						fields: [
							{
								name: 'Command name',
								value: cmd.name
							},
							{
								name: 'Aliases',
								value: aliases
							},
							{
								name: 'Description',
								value: cmd.desc
							},
							{
								name: 'Category',
								value: cmd.cat
							},
							{
								name: 'Cooldown',
								value: cmd.cooldown + ' Seconds'
							}
						]
					}
				});
			}
		} catch (e) {
			msg.channel.error('Unexpected error and that');
		}
	}
};
