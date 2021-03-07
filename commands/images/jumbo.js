const parser = require('twemoji-parser');
const svg2img_callback = require('node-svg2img');
const { promisify } = require('util');
const getBuffer = require('../../utils/getBuffer');
const svg2img = promisify(svg2img_callback);
const regex = /<?(a:|:)\w*:(\d{17}|\d{18})>/;
module.exports = {
	name: 'jumbo',
	aliases: ['j'],
	desc: 'Expand some emoji ◉‿◉\n Created by AndreMor955',
	cat: 'images',
	cooldown: 13,
	run: async (bot, message, args) => {
		if (!args[0]) return message.channel.createMessage('Put some emoji');
		const parsed = parser.parse(args[0]);
		try {
			var cachedemoji = await bot.getRESTGuildEmoji(message.guild.id, args[0]);
		} catch (_) {
			('a');
		}
		const matched = args[0].match(regex);
		if (matched) {
			const ext = args[0].startsWith('<a:') ? 'gif' : 'png';
			const img = `https://cdn.discordapp.com/emojis/${matched[2]}.${ext}`;
			const pre_buf = await getBuffer(img);
			const att = { file: pre_buf, name: matched[2] + '.' + ext };
			await message.channel.createMessage('\u200b', att);
		} else if (parsed.length >= 1) {
			const number = parseInt(args[1]);
			const size = number && (number <= 1024 && number > 0) ? number : 150;
			const buf = await svg2img(parsed[0].url, {
				format: 'png',
				width: size,
				height: size
			});
			const att = { file: buf, name: 'twemoji.png' };
			await message.channel.createMessage(
				number
					? '\u200b'
					: 'In Twemoji mode you can resize the image up to 1024.\n`jumbo <emoji> [size]`',
				att
			);
		} else if (cachedemoji) {
			const img = `https://cdn.discordapp.com/emojis/${args[0]}.${
				cachedemoji.animated ? 'gif' : 'png'
			}`;
			const buf = await getBuffer(img);
			const att = {
				file: buf,
				name: cachedemoji.id + '.' + (cachedemoji.animated ? 'gif' : 'png')
			};
			await message.channel.createMessage('\u200b', att);
		} else
			await message.channel.createMessage(
				'Please put a valid Discord custom o Twemoji/common/Unicode emoji'
			);
	}
};
