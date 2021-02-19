module.exports = {
	name: 'reverse',
	aliases: [],
	desc: 'Reverse some text',
	cat: 'misc',
	cooldown: 5,
	run: async (bot, message, args) => {
		if (!args[0])
			return message.channel.createMessage(
				'you must input text to be reversed!'
			);
		await message.channel.createMessage(
			'`' +
				args
					.join(' ')
					.split('')
					.reverse()
					.join('') +
				'`'
		);
	}
};
