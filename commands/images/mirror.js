const Canvas = require('canvas');
module.exports = {
	name: 'mirror',
	aliases: ['magicmirror'],
	desc: 'this mirror projects what you want most in this world',
	cat: 'images',
	cooldown: 10,
	run: async (client, message, args) => {
		let user =
			message.mentions[0] ||
			(await client.getRESTUser(args[0]).catch(() => {})) ||
			message.author;

		let avatar = user.dynamicAvatarURL('png', 256);

		const canvas = Canvas.createCanvas(451, 679);

		const ctx = canvas.getContext('2d');

		let bg = await Canvas.loadImage(
			'https://cdn.discordapp.com/attachments/819806766313242655/819806787132850186/Untitled108_20210311233631.png'
		);

		ctx.drawImage(bg, 0, 0);
		ctx.beginPath();
		ctx.arc(canvas.width / 2, 500, 125, 0, Math.PI * 2);
		ctx.stroke();
		ctx.closePath();
		ctx.clip();

		let image = await Canvas.loadImage(avatar);

		ctx.globalAlpha = 0.5;
		ctx.drawImage(image, 100.5, 375);

		message.channel.createMessage('\u200b', {
			file: canvas.toBuffer(),
			name: 'mirror.png'
		});
	}
};
