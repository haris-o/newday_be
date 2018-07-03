'use strict';
const jsonfile = require('jsonfile');
const file = './static/quotes.json';

module.exports = {
	up: (queryInterface, Sequelize) => {
		let obj = jsonfile.readFileSync(file);
		return queryInterface.bulkInsert('Quotes', obj, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Quotes', null, {});
	}
};
