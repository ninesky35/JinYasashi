const Canvas = require('canvas');
module.exports = {
	name: 'simpcard',
	aliases: ['simp'],
	desc:
		'Make a Simpcard with the avatar of the mentioned by ID or normal Mention or own avatar',
	cat: 'images',
	cooldown: 20,
	run: async (bot, msg, args) => {
		let user =
			msg.mentions[0] ||
			(await bot.getRESTUser(args[0]).catch(() => {})) ||
			msg.author;

		let avatar = user.staticAvatarURL;

		const canvas = Canvas.createCanvas(318, 192);

		const ctx = canvas.getContext('2d');

		const bg = await Canvas.loadImage(
			'https://cdn.discordapp.com/attachments/750461925099307129/751872081175511050/IMG_20200905_133034_358.JPG'
		);
		ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

		ctx.beginPath();
		ctx.arc(70, 75, 50, 0, Math.PI * 2);
		ctx.fillStyle = '#ffffff';
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.clip();
		let imagen = await Canvas.loadImage(avatar);
		ctx.drawImage(imagen, 20, 23.5, 100, 100);

		msg.channel.createMessage('\u200b', {
			file: canvas.toBuffer(),
			name: 'simp.png'
		});
	}
};
