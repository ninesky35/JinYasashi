const neko = new (require('nekos.life'))();
module.exports = {
	name: 'textcat',
	aliases: ['catemoji'],
	desc: 'Get text of a cat emoji',
	cat: 'anime',
	cooldown: 5,
	run: (bot, msg, args) => {
		neko.sfw.catText().then(data => {
			msg.channel.createMessage({
				embed: {
					color: bot.color,
					description: `Here! take your CatText Emoji!`,
					fields: [
						{
							name: '\u200b',
							value: '`' + data.cat + '`'
						}
					],
					footer: {
						text: '(◍•ᴗ•◍)❤'
					},
					timestamp: new Date()
				}
			});
		});
	}
};
