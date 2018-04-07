'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'TaskCategories',
			[
				{
					name: 'General',
					id: 1,
					TaskTypeId: 1
				},
				{
					name: 'General',
					id: 2,
					TaskTypeId: 2
				}
			], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('TaskCategories', null, {});
	}
};
