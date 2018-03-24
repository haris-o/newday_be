'use strict';

var faker = require('faker');
var bcrypt = require('bcrypt');

module.exports = {
	up: (queryInterface, Sequelize) => {
		let users = [
			{
				id: faker.random.uuid(),
				provider: 'local',
				email: 'user@user.com',
				password: bcrypt.hashSync('user', 10),
				UserRoleId: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: faker.random.uuid(),
				provider: 'local',
				email: 'admin@admin.com',
				password: bcrypt.hashSync('admin', 10),
				UserRoleId: 0,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: '75e47589-d8b9-49a0-8394-8359e6471f11',
				provider: 'google',
				providerId: '100904279359627792666',
				email: faker.internet.email(),
				UserRoleId: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: '854f96ca-63b7-4b42-8194-e15500007887',
				provider: 'facebook',
				providerId: '1721207781250672',
				email: faker.internet.email(),
				UserRoleId: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];

		return queryInterface.bulkInsert('Users', users, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null);
	}
};
