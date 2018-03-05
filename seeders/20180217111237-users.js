/*
'use strict';

var faker = require('faker');

module.exports = {
	up: (queryInterface, Sequelize) => {
		let users = [];
		for (let i = 0; i < 100; i++) {
			let newUser = {
				id: i,
				email: faker.internet.email(),
				token: faker.finance.iban(),
				UserRoleId: i % 2,
				createdAt: faker.date.recent(),
				updatedAt: new Date()
			};

			users.push(newUser);
		}

		return queryInterface.bulkInsert('Users', users, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null);
	}
};
*/
