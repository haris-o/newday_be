'use strict';
module.exports = (sequelize, DataTypes) => {
	var UserDetail = sequelize.define(
		'UserDetail',
		{
			id: {
				field: 'UserId',
				allowNull: false,
				type: DataTypes.UUID,
				primaryKey: true
			},
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			username: DataTypes.STRING,
			dateOfBirth: DataTypes.DATE,
			weight: DataTypes.INTEGER,
			height: DataTypes.INTEGER,
			isFemale: DataTypes.BOOLEAN
		},
		{
			paranoid: true
		}
	);
	UserDetail.associate = function(models) {
		UserDetail.belongsTo(models.User, {
			foreignKey: 'id',
			targetKey: 'id'
		});
	};
	return UserDetail;
};
