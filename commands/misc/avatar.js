module.exports = {
	name: 'avatar',
	aliases: ['av', 'pfp', 'pic'],
	desc: 'See the avatar of the mentioned by ID or mention or yours',
	cat: 'misc',
	cooldown: 20,
	run: async (bot, msg, args) => {
		try {
			let user =
				msg.mentions[0] ||
				(await bot.getRESTUser(args[0]).catch(() => {})) ||
				msg.author;
			msg.channel.createMessage({
				embed: {
					color: bot.color,
					author: {
						name: user.username,
						icon_url: user.avatarURL
					},
					title: user.username + "'s Avatar",
					image: {
						url: user.avatarURL.replace('size=128', 'size=2048')
					},
					footer: {
						text: 'Req by ' + msg.author.tag,
						icon_url: msg.author.avatarURL
					}
				}
			});
		} catch (e) {
			msg.channel.error('Unexpected error! *Why am i so useless?*');
		}
	}
};
