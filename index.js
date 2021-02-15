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
Eris.Channel.prototype.error = function(error) {
	this.createMessage('Gomen-ne! there was an error!\n' + error);
};
const bot = new Eris(process.env.DISCORD_TOKEN, {
	intents: 4617,
	allowedMentions: { everyone: false, roles: false },
	restMode: true
});
const { readdirSync, statSync } = require('fs');
const Database = require('@replit/database');
const db = new Database();
bot.commands = new Eris.Collection();
bot.cooldowns = new Eris.Collection();
bot.color = 0xac6a65;
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
	console.log('Bot started');
});

bot.on('messageCreate', async msg => {
	let data = await db.get(`prefix_${msg.guild.id}`);
	let prefix = data ? data : '&';
	if (msg.author.bot) return;
	if (!msg.guild) return;

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

	if (cmd.cat == 'devs' && msg.author.id != '363634697349234688') {
		return;
	}

	if (!bot.cooldowns.has(cmd.name)) {
		bot.cooldowns.set(cmd.name, new Eris.Collection());
	}

	const now = Date.now();
	const timestamps = bot.cooldowns.get(cmd.name);
	const cooldownAmount = (cmd.cooldown || 3) * 1000;

	if (timestamps.has(msg.author.id)) {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return msg.channel.createMessage(
				`please wait ${timeLeft.toFixed(
					1
				)} more second(s) before reusing the \`${cmd.name}\` command.`
			);
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
	Promise.all([db.get(`prefix_${guild.id}`)]).then(async data => {
		if (data[0]) {
			db.delete(`prefix_${guild.id}`);
			console.log('Prefix deleted in the guild ' + guild.id);
		}
	});
});
bot.connect();
