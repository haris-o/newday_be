'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Tasks', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			completed: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			date: {
				type: Sequelize.DATEONLY
			},
			UserId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Users'
				},
				onDelete: 'CASCADE'
			},
			TaskTypeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'TaskTypes'
				},
				onDelete: 'CASCADE'
			},
			TaskCategoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'TaskCategories'
				},
				onDelete: 'CASCADE'
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Tasks');
	}
};