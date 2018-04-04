'use strict';
module.exports = (sequelize, DataTypes) => {
	let TaskCategory = sequelize.define('TaskCategory', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false
	});
	TaskCategory.associate = function (models) {
		TaskCategory.hasMany(models.Task, {
			foreignKey: 'TaskCategoryId',
			onDelete: 'CASCADE'
		});
		TaskCategory.belongsTo(models.User, {
			foreignKey: 'UserId',
			onDelete: 'CASCADE'
		});
		TaskCategory.belongsTo(models.TaskType, {
			foreignKey: {
				name: 'TaskTypeId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
	};
	return TaskCategory;
};