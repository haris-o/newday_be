'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			token: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			password: {
				type: Sequelize.STRING
			},
			UserRoleId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'UserRoles',
					key: 'id'
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
		return queryInterface.dropTable('Users');
	}
};
