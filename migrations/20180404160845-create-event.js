'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Events', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			startDate: {
				allowNull: false,
				type: Sequelize.DATEONLY
			},
			endDate: {
				type: Sequelize.DATEONLY
			},
			startTime: {
				type: Sequelize.TIME
			},
			endTime: {
				type: Sequelize.TIME
			},
			location: {
				type: Sequelize.STRING
			},
			details: {
				type: Sequelize.TEXT
			},
			UserId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Users'
				},
				onDelete: 'CASCADE'
			},
			EventTypeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'EventTypes'
				},
				onDelete: 'CASCADE'
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Events');
	}
};