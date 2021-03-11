const Eris = require('eris-additions')(require('eris'));
module.exports = {
	name: 'serverinfo',
	aliases: ['guildinfo'],
	desc: 'See Server information',
	cat: 'misc',
	cooldown: 8,
	run: async (bot, message, args) => {
		const server = message.channel.guild;
		//Obtenemos las características del servidor.
		const features = server.features.join('\n');
		if (!features) {
			var features2 = 'None';
		} else {
			var features2 = features;
		}
		//Esto nos ayudará a detectar cada tipo de verificación de servidor (moderación)
		let vef = [
			'None',
			'Low',
			'Medium',
			'High ((ノಠ益ಠ)ノ彡┻━┻)',
			'Xtra Super Higher (┻┻︵ヽ(`Д´)ﾉ︵┻┻)'
		];
		//Obtenemos las categorías.
		const cat = server.channels.filter(c => c.type === 4).length;
		//Yes. Hay que darle estilo a esto.
		var catname = '';
		if (cat == 1) {
			catname += 'Category';
		} else {
			catname += 'Categories';
		}
		//Widget del servidor
		let widgetenabled;
		let widgetchannel;
		//Si tenemos permisos intentar conseguir el widget via ese método.
		if (server.me.hasPermission('manageGuild')) {
			let widgetdata = await server.getWidget();
			widgetenabled = widgetdata.enabled;
			widgetchannel = widgetdata.channel_id;
		} else {
			//El modo REST debe estar habilitado, si quieres obtener el widget sin permisos.
			const r = await bot.getRESTGuild(server.id); //No devuelve mucha información cuando lo probé :(
			widgetenabled = r.widgetEnabled;
			widgetchannel = r.widgetChannelID;
		}
		//Tipo NotSoBot, que te da links de varios parámetros del servidor
		//Primero se empieza con el link normal al servidor.
		let links = ['[Guild](https://discord.com/channels/' + server.id + ')'];
		//Si tiene tal cosa, mostrarlo en los links
		//Imagen que se muestra en la invitación
		if (server.dynamicSplashURL()) {
			links.push('[Invite Splash Image](' + server.dynamicSplashURL() + ')');
		}
		//Banner del servidor
		if (server.dynamicBannerURL()) {
			links.push('[Banner Image](' + server.dynamicBannerURL() + ')');
		}
		//Si el Widget está habilitado
		if (widgetenabled) {
			links.push(
				'[Widget](https://discord.com/widget?id=' +
					server.id +
					'), [Widget Image](https://discord.com/api/v7/guilds/' +
					server.id +
					'/widget.png)'
			);
		}
		//<Collection>.filter devuelve un array, por eso el length
		//Separamos a los bots de los miembros
		const bots = server.members.filter(m => m.user.bot).length;

		const rmembers = server.memberCount - bots;

		//Separamos roles por normales y administrados por un servicio
		const roles = server.roles.size;

		const mroles = server.roles.filter(r => r.managed).length;

		const rroles = roles - mroles;

		//Separamos emojis normales y animados
		const ae = server.emojis.filter(e => e.animated).length;

		const emojis = server.emojis.length - ae;

		//Separamos los miembros dependiendo de su estado actual.
		//m.activities sería lo que estarían jugando mientras que m.status el estado normal. m.clientStatus sería "en qué dispositivo(s) está(n)"

		const embed = new Eris.Embed({ timestamp: new Date() })
			.author(
				message.author.username + '#' + message.author.discriminator,
				message.author.dynamicAvatarURL()
			)
			.title('Server Information')
			.field('Name', server.name, true)
			.field('Owner', '<@!' + server.ownerID + '>', true)
			.field('Created At', new Date(server.createdAt).toString(), true)
			.field('Region', server.region, true)
			.field('Verification Level', vef[server.verificationLevel], true)
			.field(
				'Members',
				server.memberCount + '\nHumans: ' + rmembers + '\nBots: ' + bots,
				true
			)
			.field(
				'Channels',
				server.channels.filter(c => c.type !== 4).length +
					' ""(' +
					cat +
					' ' +
					catname +
					')\nText = ' +
					server.channels.filter(c => c.type === 0).length +
					'\nVoice = ' +
					server.channels.filter(c => c.type === 2).length,
				true
			)
			.field(
				'Emojis',
				server.emojis.length + '\nNormal = ' + emojis + '\nAnimated = ' + ae,
				true
			)
			.field(
				'Roles',
				roles + '\nNormal = ' + rroles + '\nManaged = ' + mroles,
				true
			)
			.field('Boost Level', server.premiumTier.toString(), true)
			//Si le pones una cosa que no sea string el objeto embed se malogrará. Asegurate de siempre poner un string en field()
			.field('Boosts', server.premiumSubscriptionCount.toString(), true)
			.field('Features', features2, true)
			//No hay propiedades que "te permitan acceder al canal directamente" via por ejemplo los widgets. Usaremos el truco que anteriormente se usaba, ponerlo en formato de mención
			.field(
				'System Channel',
				server.systemChannelID ? '<#' + server.systemChannelID + '>' : 'None',
				true
			)
			.field(
				'Widget?',
				widgetenabled
					? 'Yes' +
					  (widgetchannel ? ', in ' + ('<#' + widgetchannel + '>') : '')
					: 'No',
				true
			)
			.field('Links', links.join(', '), true)
			.thumbnail(server.dynamicIconURL())
			.image(server.dynamicSplashURL({ size: 128 }), true)
			//Sólo enteros
			.color(bot.color);
		//Enviamos el embed
		message.channel.createMessage({ embed: embed });
	}
};
