'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('UserDetails', {
			id: {
				field: 'UserId',
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			firstName: {
				type: Sequelize.STRING
			},
			lastName: {
				type: Sequelize.STRING
			},
			username: {
				type: Sequelize.STRING
			},
			dateOfBirth: {
				type: Sequelize.DATEONLY
			},
			weight: {
				type: Sequelize.INTEGER
			},
			height: {
				type: Sequelize.INTEGER
			},
			isFemale: {
				type: Sequelize.BOOLEAN
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
		return queryInterface.dropTable('UserDetails');
	}
};
