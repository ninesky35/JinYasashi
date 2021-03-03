const fetch = require('node-fetch');
const FileType = require('file-type');
const gifResize = require('@gumlet/gif-resize');
const mediaExtractor = require('media-extractor');
const isSvg = require('is-svg');
const svg2img_callback = require('node-svg2img');
const { promisify } = require('util');
const parser = require('twemoji-parser');
const svg2img = promisify(svg2img_callback);
module.exports = {
	name: 'emojify',
	aliases: ['to48px'],
	desc:
		'Make a fake emoji and save it in your favorite GIFs.\nCreated by AndreMor955',
	cat: 'images',
	cooldown: 11,
	run: async (bot, msg, args) => {
		if (!args[0] && !msg.attachments[0])
			return msg.channel.createMessage('Usage: emojify <url/attachment/emoji>');
		let url;
		const user =
			msg.mentions[0] ||
			(await bot.getRESTUser(args[0]).catch(() => {})) ||
			null;
		if (user) {
			url = user.avatarURL.replace('size=128', 'size=64');
		} else if (msg.attachments[0]) {
			url = msg.attachments[0].url;
		} else if (args[0].match(/<?(a:|:)\w*:(\d{17}|\d{18})>/)) {
			const matched = args[0].match(/<?(a:|:)\w*:(\d{17}|\d{18})>/);
			const ext = args[0].startsWith('<a:') ? 'gif' : 'png';
			url = `https://cdn.discordapp.com/emojis/${matched[2]}.${ext}`;
		} else if (
			(/tenor\.com\/view/.test(args[0]) ||
				/tenor.com\/.+\.gif/.test(args[0]) ||
				/giphy\.com\/gifs/.test(args[0])) &&
			(await mediaExtractor.resolve(args[0]))
		) {
			url = await mediaExtractor.resolve(args[0]);
		} else if (
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/gm.test(
				args[0]
			)
		) {
			url = args[0];
		}
		const parsed = parser.parse(args[0]);
		if (parsed.length >= 1) {
			url = parsed[0].url;
		}
		if (!url) return msg.channel.createMessage('Invalid URL!');
		const buffer = await render(url);
		const att = { file: buffer, name: `emoji.gif` };
		await msg.channel.createMessage('\u200b', att);
	}
};

async function render(url) {
	const res = await fetch(url);
	if (!res.ok)
		throw new Error(`Status code returned ${res.status} (${res.statusText})`);
	const pre_buf = await res.buffer();
	const type = await FileType.fromBuffer(pre_buf);
	if (type.mime === 'image/gif') {
		const buffer = await gifResize({
			width: 48,
			interlaced: true,
			resize_method: 'lanczos2'
		})(pre_buf);
		return buffer;
	} else if (isSvg(pre_buf)) {
		return await svg2img(pre_buf, { format: 'png', width: 48, height: 48 });
	} else {
		const sharp = (await import('sharp')).default;
		const buffer = await sharp(pre_buf)
			.resize(48)
			.png()
			.toBuffer();
		return buffer;
	}
}
