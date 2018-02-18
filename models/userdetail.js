'use strict';
module.exports = (sequelize, DataTypes) => {
	var UserDetails = sequelize.define(
		'UserDetails',
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			username: DataTypes.STRING,
			dateOfBirth: DataTypes.DATEONLY,
			weight: DataTypes.INTEGER,
			height: DataTypes.INTEGER,
			isFemale: DataTypes.BOOLEAN
		},
		{}
	);
	UserDetails.associate = function(models) {
		// associations can be defined here
	};
	return UserDetails;
};
