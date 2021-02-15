module.exports = function(bot, category) {
	return bot.commands.filter(x => x.cat == category).length;
};
