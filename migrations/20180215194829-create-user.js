'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING
			},
			username: {
				type: Sequelize.STRING
			},
			fullName: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING,
				unique: true
			},
			token: {
				type: Sequelize.STRING,
				allowNull: false,
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
