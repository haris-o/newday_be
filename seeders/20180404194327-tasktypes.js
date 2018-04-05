'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'TaskTypes',
			[
				{
					name: 'To Do',
					id: 1
				},
				{
					name: 'To Buy',
					id: 2
				}
			], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('TaskTypes', null, {});
	}
};
