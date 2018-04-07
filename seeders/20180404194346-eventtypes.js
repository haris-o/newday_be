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
					name: 'Date',
					id: 2
				},
				{
					name: 'Party',
					id: 3
				},
				{
					name: 'Training',
					id: 4
				},
				{
					name: 'Girls Night Out',
					id: 5
				},
				{
					name: 'Vacation',
					id: 6
				},
				{
					name: 'Time For Me',
					id: 7
				},
				{
					name: 'Doctor',
					id: 8
				},
				{
					name: 'Movie',
					id: 9
				},
				{
					name: 'Theatre',
					id: 10
				},
				{
					name: 'Family',
					id: 11
				},
			], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('EventTypes', null, {});
	}
};
