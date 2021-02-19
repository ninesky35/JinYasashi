module.exports = {
	name: 'nsfw',
	aliases: [],
	desc:
		'Activate or Deactivate the NSFW of a Channel, Channel mentioned or in which you have written the command.',
	cat: 'misc',
	cooldown: 6,
	run: (bot, msg, args) => {
		let channel = msg.channelMentions[0] || msg.channel; // necesitamos un canal para activar o desactivar el nsfw
		if (!msg.member.permissions.has('manageChannels'))
			return msg.channel.createMessage(
				"You don't have enough permissions, you need the Manage Channels permission"
			);
		if (!msg.guild.me.permissions.has('manageChannels'))
			return msg.channel.createMessage(
				"I don't have enough permissions, I need the Manage Channels permission"
			);

		if (channel == msg.channelMentions[0]) {
			let channelobj = bot.getChannel(channel);
			if (!channelobj.nsfw) {
				bot.editChannel(channel, {
					nsfw: true
				});
				msg.channel.createMessage(
					`\`Now the "<#${
						channel.id
					}>" channel is NSFW <:Jeje:792860353355579433>\``
				);
			} else {
				bot.editChannel(channel, {
					nsfw: false
				});
				msg.channel.createMessage(
					`\`Now the channel "<#${
						channel.id
					}>" is no longer NSFW <:hipotenusa:769374548986036254>\``
				);
			}
		} else if (channel == msg.channel) {
			if (channel.nsfw) {
				channel.edit({
					nsfw: false
				});
				msg.channel.createMessage(
					`\`Now the channel "<#${
						channel.id
					}>" is no longer NSFW <:hipotenusa:769374548986036254>\``
				);
			} else {
				channel.edit({
					nsfw: true
				});
				msg.channel.createMessage(
					`\`Now the "<#${
						channel.id
					}>" channel is NSFW <:Jeje:792860353355579433>\``
				);
			}
		}
	}
};
