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
	}, {
		timestamps: false
	});
	Task.associate = function (models) {
		Task.belongsTo(models.User, {
			foreignKey: {
				name: 'UserId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
		Task.belongsTo(models.TaskCategory, {
			foreignKey: {
				name: 'TaskCategoryId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
		Task.belongsTo(models.TaskType, {
			foreignKey: {
				name: 'TaskTypeId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
	};
	return Task;
};