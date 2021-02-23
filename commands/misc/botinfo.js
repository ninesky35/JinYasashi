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
			const mem = process.memoryUsage();
			const memoryU = `${memory(mem.rss)}`;
			let users = eval(bot.guilds.map(x => x.memberCount).join(' + '));
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
							value: '`' + bot.user.tag + '`'
						},
						{
							name: 'Developers',
							value: '`Over#7073, KO_ver2#8529`'
						},
						{
							name: 'Uptime',
							value: '`' + hd(bot.uptime) + '`'
						},
						{
							name: 'Lib',
							value: '`Eris [0.14.0]`'
						},
						{
							name: 'Ping',
							value: '`' + bot.shards.get(msg.guild.shard.id).latency + 'ms`'
						},
						{
							name: 'CPU',
							value: '`' + require('os').cpus()[0].model + '`'
						},
						{
							name: 'RAM Usage',
							value: '`' + memoryU + '`'
						},
						{
							name: 'CPU Usage',
							value: '`' + percent.toFixed(2) + '%`'
						},
						{
							name: 'Servers',
							value: '`' + bot.guilds.size + '`'
						},
						{
							name: 'Users',
							value: '`' + users.toLocaleString() + '`'
						}
					]
				}
			});
		} catch (e) {
			msg.channel.error('Still being unexpected');
		}
	}
};

function memory(bytes = 0, r = true) {
	const gigaBytes = bytes / 1024 ** 3;
	if (gigaBytes > 1) {
		return `${gigaBytes.toFixed(1)} ${r ? 'GB' : ''}`;
	}

	const megaBytes = bytes / 1024 ** 2;
	if (megaBytes > 1) {
		return `${megaBytes.toFixed(2)} ${r ? 'MB' : ''}`;
	}

	const kiloBytes = bytes / 1024;
	if (kiloBytes > 1) {
		return `${kiloBytes.toFixed(2)} ${r ? 'KB' : ''}`;
	}

	return `${bytes.toFixed(2)} ${r ? 'B' : ''}`;
}
