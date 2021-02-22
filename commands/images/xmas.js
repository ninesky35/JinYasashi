const Canvas = require('canvas');
const getBuffer = require('../../utils/getBuffer');
module.exports = {
	name: 'xmas',
	aliases: ['padoru'],
	desc:
		'Look at the current date and see how many days are left until Christmas, and with an extra padoru because why not.',
	cat: 'images',
	cooldown: 20,
	run: async (bot, msg, args) => {
		let obj = {
			0: 'Jan',
			1: 'Feb',
			2: 'Mar',
			3: 'Apr',
			4: 'May',
			5: 'June',
			6: 'July',
			7: 'Aug',
			8: 'Sep',
			9: 'Oct',
			10: 'Nov',
			11: 'Dec'
		};
		let date = new Date();

		let date1 = new Date(Date.now());
		let date2 = new Date('12/25/2021');
		let diffe = date2.getTime() - date1.getTime();
		let diffdays = diffe / (1000 * 3600 * 24);

		const canvas = Canvas.createCanvas(1104, 594);
		const ctx = canvas.getContext('2d');
		const bg = await Canvas.loadImage(
			'https://cdn.discordapp.com/attachments/799712845289226250/799941300870447144/29_sin_titulo_20210116035612.png'
		);
		ctx.drawImage(bg, 0, 0);

		ctx.font = '40px CDB';
		ctx.fillStyle = '#000';
		ctx.fillText(Math.round(diffdays), 305, 193);

		ctx.font = '49px Lemon';
		ctx.fillStyle = '#ff0000';
		ctx.rotate((-7.5 * Math.PI) / 180);
		ctx.fillText(obj[date.getMonth()], 82, 377);

		ctx.font = '58px Lemon';
		ctx.fillStyle = '#ff0000';
		ctx.rotate(-6.3, Math.PI / 180);
		ctx.fillText(date.getDate(), 90, 452);
		if (obj[date.getMonth()] == 'Dec' && date.getDate() == '25') {
			const buff = await getBuffer(
				'https://cdn.discordapp.com/attachments/799712845289226250/801595263847235614/padoru_padoru360P.mp4'
			);
			msg.channel.createMessage('\u200b', { file: buff, name: 'xmas.mp4' });
		} else {
			msg.channel.createMessage('\u200b', {
				file: canvas.toBuffer(),
				name: 'xmas.png'
			});
		}
	}
};
