'use strict';

var faker = require('faker');

module.exports = {
	up: (queryInterface, Sequelize) => {
		let userDetails = [
			{
				UserId: '75e47589-d8b9-49a0-8394-8359e6471f11',
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				isFemale: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				UserId: '854f96ca-63b7-4b42-8194-e15500007887',
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				isFemale: false,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];

		return queryInterface.bulkInsert('UserDetails', userDetails, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('UserDetails', null);
	}
};
