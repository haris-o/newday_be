'use strict';
module.exports = (sequelize, DataTypes) => {
	let TaskCategory = sequelize.define('TaskCategory', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		paranoid: true
	});
	TaskCategory.associate = function (models) {
		TaskCategory.hasMany(models.Task, {
			foreignKey: 'TaskCategoryId'
		});
		TaskCategory.belongsTo(models.User, {
			foreignKey: 'UserId'
		});
		TaskCategory.belongsTo(models.TaskType, {
			foreignKey: {
				name: 'TaskTypeId',
				allowNull: false
			}
		});
	};
	return TaskCategory;
};