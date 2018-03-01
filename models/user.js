'use strict';
module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.STRING
			},
			email: {
				allowNull: true,
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			password: {
				type: DataTypes.STRING
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			}
		},
		{}
	);
	User.associate = function(models) {
		User.belongsTo(models.UserRole, {
			foreignKey: {
				name: 'UserRoleId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
		User.hasOne(models.UserDetail, {
			foreignKey: 'id'
		});
	};
	return User;
};
