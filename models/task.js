'use strict';
module.exports = (sequelize, DataTypes) => {
	let Task = sequelize.define('Task', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		date: {
			type: DataTypes.DATEONLY
		}
	}, {});
	Task.associate = function (models) {
		Task.belongsTo(models.User, {
			foreignKey: {
				name: 'UserId',
				allowNull: false
			}
		});
		Task.belongsTo(models.TaskCategory, {
			foreignKey: 'TaskCategoryId'
		});
		Task.belongsTo(models.TaskType, {
			foreignKey: {
				name: 'TaskTypeId',
				allowNull: false
			}
		});
	};
	return Task;
};