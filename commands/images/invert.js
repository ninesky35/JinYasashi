const invert = require('../../utils/invert.js');
module.exports = {
	name: 'invert',
	aliases: [],
	desc: 'Invert the avatar of the mentioned (By ID or normal mention) or yours',
	cat: 'images',
	cooldown: 15,
	run: async (bot, msg, args) => {
		let user =
			msg.mentions[0] ||
			(await bot.getRESTUser(args[0]).catch(() => {})) ||
			msg.author;
		let avatar = user.staticAvatarURL.replace('size=128', 'size=1024');

		const buff = await invert(avatar);
		msg.channel.createMessage('\u200b', { file: buff, name: 'inverted.png' });
	}
};
