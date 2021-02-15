module.exports = {
	name: 'eval',
	aliases: ['e'],
	cat: 'devs',
	cooldown: 0,
	run: async (bot, msg, args) => {
		let code = args.join(' ');
		if (!code) return;
		try {
			let evaluado = await eval(code);
			let tipo = typeof evaluado;
			let resultado = require('util').inspect(evaluado, { depth: 0 });

			msg.channel.createMessage(
				'```kt\n(' + tipo + ') ' + resultado.slice(0, 1024) + '```'
			);
		} catch (err) {
			msg.channel.createMessage('```kt\n' + err.stack.toString().slice(0, 1024) + '```');
		}
	}
};
