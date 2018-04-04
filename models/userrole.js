'use strict';
module.exports = (sequelize, DataTypes) => {
	let UserRole = sequelize.define(
		'UserRole',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			timestamps: false
		}
	);
	UserRole.associate = function(models) {
		UserRole.hasMany(models.User, {
			foreignKey: {
				name: 'UserRoleId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
	};
	return UserRole;
};
