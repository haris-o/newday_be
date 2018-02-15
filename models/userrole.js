'use strict';
module.exports = (sequelize, DataTypes) => {
	var UserRole = sequelize.define(
		'UserRole',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{}
	);
	UserRole.associate = function(models) {
		// associations can be defined here
	};
	return UserRole;
};
