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
			username: DataTypes.STRING,
			full_name: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				unique: true
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			}
		},
		{}
	);
	User.associate = function(models) {
		// associations can be defined here
	};
	return User;
};
