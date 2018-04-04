'use strict';
module.exports = (sequelize, DataTypes) => {
	let TaskType = sequelize.define('TaskType', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false
	});
	TaskType.associate = function (models) {
		TaskType.hasMany(models.Task, {
			foreignKey: {
				name: 'TaskTypeId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
		TaskType.hasMany(models.TaskCategory, {
			foreignKey: {
				name: 'TaskTypeId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
	};
	return TaskType;
};