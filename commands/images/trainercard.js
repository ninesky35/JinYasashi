const { loadImage, createCanvas } = require('canvas');
module.exports = {
	name: 'trainercard',
	aliases: ['trainer'],
	desc: 'Make a Trainercard!',
	cat: 'images',
	cooldown: 20,
	run: async (bot, msg, args) => {
		const canvas = createCanvas(747, 1038);
		const ctx = canvas.getContext('2d');

		let textos = args.join(' ').split('/');
		if (!textos[0] || !textos[1])
			return msg.channel.createMessage(
				'You have to write the title of the trainer card and the description of the card, separated by a /'
			);
		const bg = await loadImage(
			'https://cdn.discordapp.com/attachments/799712845289226250/801668157093314600/Trainercard.png'
		);
		ctx.drawImage(bg, 0, 0);
		ctx.font = '40px Lemon';
		ctx.fillStyle = '#000';
		ctx.fillText(textos[0], 66.2, 116);
		let textos2 = textos[1].split('');
		let texto = [];
		let longitud = 34;
		for (let i = 0; i <= textos2.length; i++) {
			texto.push(textos2[i]);
			if (i == longitud) {
				texto.push('\n');
				longitud = longitud + 34;
			}
		}
		ctx.font = '25px Lemon';
		ctx.fillStyle = '#000';
		ctx.fillText(texto.join(''), 86, 636);

		msg.channel.createMessage('\u200b', {
			file: canvas.toBuffer(),
			name: 'trainer.png'
		});
	}
};
