'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('TaskCategories', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			TaskTypeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'TaskTypes'
				}
			},
			UserId: {
				type: Sequelize.UUID,
				references: {
					model: 'Users'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('TaskCategories');
	}
};