const hd = require('humanize-duration');
const { promisify } = require('util');
const cpuStat = require('cpu-stat');
const os = require('os');
const usagePercent = promisify(cpuStat.usagePercent);
module.exports = {
	name: 'botinfo',
	aliases: ['botstats', 'info'],
	desc: "Botinfo, the command name couldn't be more self-describing",
	cat: 'misc',
	cooldown: 15,
	run: async (bot, msg, args) => {
		try {
			percent = await usagePercent();
			msg.channel.createMessage({
				embed: {
					color: bot.color,
					author: {
						name: msg.author.tag,
						icon_url: msg.author.avatarURL
					},
					title: 'Bot Info & Stats',
					fields: [
						{
							name: 'Name',
							value: bot.user.tag
						},
						{
							name: 'Creator | Developer | Icon',
							value:
								'Over#7073 **|** KO_ver2#8529 **|** [BulzyKrown](https://www.instagram.com/bulzykrown)'
						},
						{
							name: 'Uptime',
							value: hd(bot.uptime)
						},
						{
							name: 'Lib',
							value: 'Eris [0.14.0]'
						},
						{
							name: 'Ping',
							value: bot.shards.get(msg.guild.shard.id).latency + 'ms'
						},
						{
							name: 'CPU',
							value: require('os').cpus()[0].model
						},
						{
							name: 'CPU Usage',
							value: percent.toFixed(2) + '%'
						},
						{
							name: 'Servers',
							value: bot.guilds.size
						},
						{
							name: 'Cached Users',
							value: bot.users.size
						}
					]
				}
			});
		} catch (e) {
			msg.channel.error('Still being unexpected');
		}
	}
};
