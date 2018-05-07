'use strict';
module.exports = (sequelize, DataTypes) => {
	let UserDetail = sequelize.define(
		'UserDetail',
		{
			UserId: {
				allowNull: false,
				type: DataTypes.UUID,
				primaryKey: true
			},
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			nickname: DataTypes.STRING,
			dateOfBirth: DataTypes.DATEONLY,
			weight: DataTypes.REAL,
			height: DataTypes.REAL,
			isFemale: {
				type: DataTypes.BOOLEAN,
				defaultValue: true
			}
		},
		{
			timestamps: false
		}
	);
	UserDetail.associate = function(models) {
		UserDetail.belongsTo(models.User, {
			foreignKey: {
				name: 'UserId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
	};
	return UserDetail;
};
