'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'UserRoles',
			[
				{
					id: 0,
					name: 'admin'
				},
				{
					id: 1,
					name: 'user'
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('UserRoles', null, {});
	}
};
