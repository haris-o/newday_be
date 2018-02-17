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
			}
		},
		{}
	);
	User.associate = function(models) {
		User.belongsTo(models.UserRole);
	};
	return User;
};
