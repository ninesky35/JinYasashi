const Database = require('@replit/database');
const db = new Database();
module.exports = {
	name: 'setprefix',
	aliases: ['prefix'],
	desc: 'Change the prefix of the bot',
	cat: 'misc',
	cooldown: 30,
	run: async (bot, msg, args) => {
    try {
		if (!msg.member.permissions.has('manageGuild'))
			return msg.channel.createMessage("Gomen-ne! but you don't have enough permissions to use this command, you need the Manage Guild permission");

		if (!args[0])
			return msg.channel.createMessage("Gomen-ne! but you didn't write the new prefix");

		if (args[0].length >= 6)
			return msg.channel.createMessage("Gomen-ne! but the length of the new prefix cannot be larger than 6 chars");

		await db.set(`prefix_${msg.channel.guild.id}`, args[0]);
		msg.channel.createMessage("The prefix was changed correctly! the new prefix is "+args[0]);
    } catch(e) {
      console.log(e.stack)
      return msg.channel.createMessage("ERROR! An error ocurred, try again. Sorry Sir")
    }
	}
};
