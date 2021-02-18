const { Schema, model } = require('mongoose');

let prefixSchema = new Schema({
	_id: { type: String, required: true },
	prefix: { type: String }
});

class Prefixes {
	static _schema = prefixSchema;
	static model = model('prefixes', Prefixes._schema);
	constructor() {}

	static async register(_id) {
		return await new Prefixes.model({ _id }).save();
	}

	static async get(id) {
		return (await Prefixes.model.findById(id)) || (await Prefixes.register(id));
	}

	static async set(key, value) {
		let data = await Prefixes.get(key);
		return await data.updateOne({ _id: key, prefix: value });
	}

	static async rm(key) {
		let data = await Prefixes.get(key);
		return await Prefixes.model.deleteOne({ _id: data._id });
	}
}

module.exports = Prefixes;
