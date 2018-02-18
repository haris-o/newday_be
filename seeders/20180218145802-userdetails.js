'use strict';

var faker = require('faker');

module.exports = {
	up: (queryInterface, Sequelize) => {
		let userDetails = [];
		for (let i = 0; i < 100; i++) {
			let rand = Math.random();
			userDetails.push({
				UserId: i,
				firstName: rand < 0.7 ? faker.name.firstName() : null,
				lastName: rand < 0.7 ? faker.name.lastName() : null,
				username: rand < 0.4 ? faker.internet.userName() : null,
				dateOfBirth: rand > 0.2 ? faker.date.past(20) : null,
				weight: rand < 0.8 ? faker.random.number({ min: 40, max: 160 }) : null,
				height: rand < 0.8 ? faker.random.number({ min: 140, max: 210 }) : null,
				isFemale: rand < 0.7,
				createdAt: '2018-02-18T08:09:33.027Z',
				updatedAt: '2018-02-18T15:44:49.004Z'
			});
		}

		return queryInterface.bulkInsert('UserDetails', userDetails, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('UserDetails', null);
	}
};
