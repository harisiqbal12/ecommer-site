module.exports = {
	getError(errors, prop) {
		try {
			console.log(errors.mapped())
			console.log(prop)
			return errors.mapped()[prop].msg;
		} catch (err) {
			return '';
		}
	},

};
