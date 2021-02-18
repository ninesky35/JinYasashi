module.exports = {
	name: 'invite',
	aliases: ['inv', 'invitation'],
	desc: 'Invitation!',
	cat: 'misc',
	run: (bot, msg, args) => {
		msg.channel.createMessage({
			embed: {
				color: bot.color,
				description:
					"Awww, you want to invite me? thaaank youuu! You won't regret, I swear!\n> [Invite Link](https://discord.com/oauth2/authorize?client_id=809938925937491989&scope=bot&permissions=67488832)\n Thanks for considering inviting me, thank you very much, seriously.",
				footer: {
					text: '(◍•ᴗ•◍)❤'
				},
				timestamp: new Date()
			}
		});
	}
};
