const { readdirSync, statSync } = require('fs');
module.exports = function(folder) {
	return readdirSync(folder).filter(function subF(file) {
		return statSync(folder + file).isDirectory();
	});
};
