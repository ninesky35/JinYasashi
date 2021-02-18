module.exports = {
	name: 'aianime',
	aliases: ['animedne'],
	desc:
		'Like aiwaifu but with this command you can choose the creativity and the seed (Creativiy: minimum 0.3, maximum: 2.0 ~ Seed: minimum 10000, maximum 99999)',
	cat: 'anime',
	cooldown: 7,
	run: async (bot, msg, args, prefix) => {
		let seed, creativiy, description;
		if (!args[0] || isNaN(args[0]) || args[0] < 10000 || args[0] > 99999) {
			seed = {
				seed: Math.floor(Math.random() * 99999 + 10000).toString(),
				good: true
			};
			if(seed.seed > 99999) {
			  seed = {
				seed: seed.seed -= 10000,
				good: true
			};
			}
		} else {
			seed = {
				seed: Math.floor(args[0]),
				good: false
			};
		}

		if (!args[1] || isNaN(args[1]) || args[1] < 0.3 || args[1] > 2.0) {
			creativiy = {
				creativiy: (Math.random() * 2.0 + 0.3).toString().slice(0, 3),
				good: true
			};
		} else {
			creativiy = {
				creativiy: args[1],
				good: false
			};
		}
		if (args[1] == '1' || args[1] == '2') {
			creativiy = {
				creativiy: args[1] + '.0',
				good: false
			};
		}
		let img = `https://thisanimedoesnotexist.ai/results/psi-${
			creativiy.creativiy
		}/seed${seed.seed}.png`;
		
		if (!seed.good || !creativiy.creativiy) {
			description = null;
		} else {
			description =
				'Usage: `aianime [Seed (10000 ~ 99999)] [Creativiy (0.3 ~ 2.0)]`\n\nSeed: `'+seed.seed+'` Creativity: `'+creativiy.creativiy+'`';
		}
		await msg.channel.createMessage({
			embed: {
				color: bot.color,
				author: {
					name: msg.author.username,
					icon_url: msg.author.avatarURL
				},
				description: description,
				image: {
					url: img
				},
				footer: {
					text: 'https://thisanimedoesnotexist.ai/',
					icon_url: msg.author.avatarURL
				},
				timestamp: new Date()
			}
		});
	}
};
