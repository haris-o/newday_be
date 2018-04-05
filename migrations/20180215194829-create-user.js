'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			provider: {
				type: Sequelize.STRING,
				allowNull: false
			},
			providerId: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING,
				unique: true
			},
			password: {
				type: Sequelize.STRING
			},
			UserRoleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'UserRoles'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users');
	}
};
