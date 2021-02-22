const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');
const getBuffer = require('../../utils/getBuffer');
module.exports = {
	name: 'topsimp',
	aliases: [],
	desc: 'Top 5 Greatest Simps in history!',
	cat: 'images',
	cooldown: 20,
	run: async (bot, msg, args) => {
		let user =
			msg.mentions[0] ||
			(await bot.fetchUser(args[0]).catch(() => {})) ||
			msg.author;
		const canvas = createCanvas(900, 797);
		const ctx = canvas.getContext('2d');
		const buff = await getBuffer(
			user.staticAvatarURL.replace('size=128', 'size=1024')
		);
		const image = await sharp(buff)
			.resize(512, 512)
			.png()
			.toBuffer();
		const avatar = await loadImage(image);
		ctx.drawImage(avatar, 183, 0);

		const bg = await loadImage(
			'https://cdn.discordapp.com/attachments/799712845289226250/800528916955398225/41_sin_titulo_20210117185554.png'
		);
		ctx.drawImage(bg, 0, 0);

		msg.channel.createMessage('\u200b', {
			file: canvas.toBuffer(),
			name: 'topsimp.png'
		});
	}
};
