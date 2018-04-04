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
				}
			},
			TaskTypeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'TaskTypes'
				}
			},
			TaskCategoryId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'TaskCategories'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Tasks');
	}
};