'use strict';

var faker = require('faker');

module.exports = {
	up: (queryInterface, Sequelize) => {
		let users = [];
		for (let i = 0; i < 100; i++) {
			users.push({
				id: faker.random.uuid(),
				username: i % 3 === 0 ? faker.internet.userName() : null,
				fullName: faker.name.findName(),
				email: faker.internet.email(),
				token: faker.finance.iban(),
				password: i % 5 === 0 ? faker.internet.password() : null,
				UserRoleId: i % 2,
				createdAt: faker.date.recent(),
				updatedAt: new Date()
			});
		}

		queryInterface.bulkInsert('Users', users, {});
	},

	down: (queryInterface, Sequelize) => {
		queryInterface.bulkDelete('Users', null);
	}
};
