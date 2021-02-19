module.exports = {
	name: 'vote',
	aliases: [],
	desc: 'Vote for Jin',
	cat: 'misc',
	cooldown: 6,
	run: (bot, msg, args) => {
		msg.channel.createMessage({
			embed: {
				color: bot.color,
				description: `Vote for Jin!\n> <:yes:806948674201976874> Vote on [MadKing](https://madking.us/bot/809938925937491989/vote)`,
				footer: {
					text: "If I'm lucky you will soon be able to vote in Top gg (◍•ᴗ•◍)❤"
				},
				timestamp: new Date()
			}
		});
	}
};
