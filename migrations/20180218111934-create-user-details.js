'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('UserDetails', {
			UserId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				references: {
					model: 'Users'
				},
				onDelete: 'CASCADE'
			},
			firstName: {
				type: Sequelize.STRING
			},
			lastName: {
				type: Sequelize.STRING
			},
			nickname: {
				type: Sequelize.STRING
			},
			dateOfBirth: {
				type: Sequelize.DATEONLY
			},
			weight: {
				type: Sequelize.REAL
			},
			height: {
				type: Sequelize.INTEGER
			},
			isFemale: {
				type: Sequelize.BOOLEAN
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('UserDetails');
	}
};
