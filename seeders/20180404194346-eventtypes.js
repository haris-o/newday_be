'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'EventTypes',
			[
				{
					name: 'Meeting',
					id: 1
				},
				{
					name: 'Conference Call',
					id: 2
				},
				{
					name: 'Date',
					id: 3
				},
				{
					name: 'Party',
					id: 4
				},
				{
					name: 'Training',
					id: 5
				}
			], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('EventTypes', null, {});
	}
};
