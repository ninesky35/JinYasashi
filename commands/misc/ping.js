module.exports = {
	name: 'ping',
	aliases: ['p'],
	desc: 'Shard Latency & Message Latency',
	cat: 'misc',
	cooldown: 5,
	run: (bot, msg, args) => {
		msg.channel.createMessage('Takkyū!').then(msj => {
			let msg_ping = msj.timestamp - msg.timestamp;
			let ping = bot.shards.get(msg.guild.shard.id).latency;
			msj.edit({
				embed: {
					color: bot.color,
					author: {
						name: msg.author.tag,
						icon_url: msg.author.avatarURL
					},
					description:
						'📡 Shard Latency\n> `' +
						ping +
						'ms`\n💌 Message Latency\n> `' +
						msg_ping +
						'ms`',
					footer: {
						text: '(◍•ᴗ•◍)❤'
					},
					timestamp: new Date()
				}
			});
		});
	}
};
