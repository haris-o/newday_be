'use strict';
module.exports = (sequelize, DataTypes) => {
	let Event = sequelize.define('Event', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		startDate: {
			allowNull: false,
			type: DataTypes.DATEONLY
		},
		endDate: {
			type: DataTypes.DATEONLY
		},
		startTime: {
			type: DataTypes.TIME
		},
		endTime: {
			type: DataTypes.TIME
		},
		location: {
			type: DataTypes.STRING
		},
		details: {
			type: DataTypes.TEXT
		}
	}, {
		timestamps: false
	});
	Event.associate = function (models) {
		Event.belongsTo(models.EventType, {
			foreignKey: {
				name: 'EventTypeId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
		Event.belongsTo(models.User, {
			foreignKey: {
				name: 'UserId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
	};
	return Event;
};