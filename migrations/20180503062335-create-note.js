'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Notes', {
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
			body: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			UserId: {
				type: Sequelize.UUID,
				onDelete: 'CASCADE',
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Notes');
	}
};