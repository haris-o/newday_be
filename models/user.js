'use strict';
module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			provider: {
				allowNull: true,
				type: DataTypes.STRING
			},
			providerId: {
				allowNull: true,
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
			password: {
				type: DataTypes.STRING
			}
		},
		{
			paranoid: true,
			scopes: {
				basic: {
					attributes: {
						exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt', 'provider', 'providerId']
					}
				}
			}
		}
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
		User.hasMany(models.Event, {
			foreignKey: {
				name: 'UserId',
				allowNull: false
			}
		});
	};
	return User;
};
