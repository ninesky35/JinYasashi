const { promisify } = require('util');
module.exports = {
	name: 'exec',
	aliases: ['ex', 'console'],
	cat: 'devs',
	desc: '???',
	cooldown: 15,
	run: async (bot, msg, args) => {
		if (!args[0])
			return msg.channel.createMessage(
				'Come on KO or do you want me to say out loud that Kurama is dead?'
			);
		try {
			const res = await promisify(require('child_process').exec)(
				args.join(' ')
			);
			if (res.stderr.length) {
				msg.channel.createMessage(
					'```' + res.stderr.toString().slice(0, 1950) + '```'
				);
			}
			if (res.stdout.length) {
				msg.channel.createMessage(
					'```' + res.stdout.toString().slice(0, 1950) + '```'
				);
			}
		} catch (e) {
			return msg.channel.send(
				'```ERR:\n' + err.toString().slice(0, 1950) + '```'
			);
		}
	}
};
