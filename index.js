const express = require('express');
const port = 3077;
const app = express();

app.get('/', (req, res) => {
	res.send('Server started');
});
app.listen(port, () => {
	console.log('Server connected');
});

const Eris = require('eris-additions')(require('eris'));
const bot = new Eris(process.env.DISCORD_TOKEN, {
	intents: 4617,
	allowedMentions: { everyone: false, roles: false },
	restMode: true
});
const axios = require('axios');
const { readdirSync, statSync } = require('fs');
require('./database/index.js');
const prefixes = require('./database/models/prefixes.js');
//// Properties
require('./utils/sendNudes');
require('./utils/reply');
require('./utils/setNSFW');
require('./utils/errorMessage');
require('./utils/delayFor');
require('./utils/deleteTime');
////
const canvas = require('canvas');
canvas.registerFont('./fonts/CaviarDreams.ttf', { family: 'Caviar' });
canvas.registerFont('./fonts/CaviarDreams_Bold.ttf', { family: 'CDB' });
canvas.registerFont('./fonts/LEMONMILK-Regular.otf', { family: 'Lemon' });
bot.commands = new Eris.Collection();
bot.cooldowns = new Eris.Collection();
bot.cache = new Map();
bot.color = 0xa67b5b;
global.db = prefixes;
const readDir = require('./utils/readDir.js');

let commandFiles = readdirSync('./commands').filter(f => f.endsWith('.js'));

for (const dir of readDir('./commands/')) {
	const folderFiles = readdirSync('./commands/' + dir).filter(f =>
		f.endsWith('.js')
	);
	for (const file of folderFiles) {
		commandFiles.push([dir, file]);
	}
}

for (const file of commandFiles) {
	let command;
	if (Array.isArray(file)) {
		command = require(`./commands/${file[0]}/${file[1]}`);
	} else {
		command = require(`./commands/${file}`);
	}
	bot.commands.set(command.name, command);
}

bot.once('ready', () => {
	bot.editStatus('dnd', {
		name: ';help',
		type: 3,
		url: 'https://github.com/diegohgaona/JinYasashi'
	});
	console.log('Bot started');
});

bot.on('messageCreate', async msg => {
	if (!msg.guild) return;
	if (msg.author.bot) return;

	let prefix;
	if (bot.cache.has(msg.guild.id)) {
		prefix = bot.cache.get(msg.guild.id);
	} else {
		let data = await prefixes.get(msg.guild.id);
		bot.cache.set(msg.guild.id, data.prefix || ';');
		prefix = bot.cache.get(msg.guild.id);
	}
	const args = msg.content
		.substring(prefix.length)
		.trimEnd()
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd =
		bot.commands.get(command) ||
		bot.commands.find(c => c.aliases.includes(command));
	if (msg.content.startsWith(`<@${bot.user.id}>`)) {
		return bot.commands.get('help').run(bot, msg, args, prefix);
	}
	if (!msg.content.startsWith(prefix)) return;
	if (!cmd) return;

	if (cmd.cat == 'devs' && msg.author.id != '561684795806187530') {
		return;
	}

	if (!bot.cooldowns.has(cmd.name)) {
		bot.cooldowns.set(cmd.name, new Eris.Collection());
	}

	const now = Date.now();
	const timestamps = bot.cooldowns.get(cmd.name);
	const cooldownAmount = (cmd.cooldown || 0) * 1000;

	if (timestamps.has(msg.author.id)) {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return msg.channel
				.createMessage(
					`please wait ${timeLeft.toFixed(
						1
					)} more second(s) before reusing the \`${cmd.name}\` command.`
				)
				.then(x => x.delTime(6000));
		}
	}
	timestamps.set(msg.author.id, now);
	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

	try {
		if (!msg.channel.permissionsOf(msg.guild.me.id).has('embedLinks')) {
			return msg.channel.error(
				"Ehm, Sorry but I don't have the embed links permission, and i need it hehe~"
			);
		}

		return cmd.run(bot, msg, args, prefix);
	} catch (e) {
		console.error(e);
	}
});

bot.on('messageUpdate', (msg, old) => {
	bot.emit('messageCreate', msg);
});

bot.on('guildDelete', async guild => {
	try {
		let data = await global.db.get(guild.id);
		if (data) {
			global.db.rm(guild.id);
		}
		let owner = await bot.getRESTUser(guild.ownerID).catch(() => {});
		bot.createMessage('812566018136211468', {
			embed: {
				color: bot.color,
				author: {
					name: guild.name,
					icon_url: guild.iconURL
				},
				thumbnail: {
					url: guild.iconURL
				},
				title: guild.name,
				fields: [
					{
						name: 'Member Count',
						value: guild.memberCount
					},
					{
						name: 'ID',
						value: guild.id
					},
					{
						name: 'Owner',
						value: owner.tag + ' (' + guild.ownerID + ')'
					}
				]
			}
		});
	} catch (e) {
		('a');
	}
});

bot.on('guildCreate', async guild => {
	let owner = await bot.getRESTUser(guild.ownerID).catch(() => {});
	bot.createMessage('812336305270816819', {
		embed: {
			color: bot.color,
			author: {
				name: guild.name,
				icon_url: guild.iconURL
			},
			thumbnail: {
				url: guild.iconURL
			},
			title: guild.name,
			fields: [
				{
					name: 'Member Count',
					value: guild.memberCount
				},
				{
					name: 'ID',
					value: guild.id
				},
				{
					name: 'Owner',
					value: owner.tag + ' (' + guild.ownerID + ')'
				}
			]
		}
	});
});

bot.connect();
