'use strict';
module.exports = (sequelize, DataTypes) => {
	let EventType = sequelize.define('EventType', {
		name: {
			allowNull: false,
			type: DataTypes.STRING
		}
	}, {
		timestamps: false
	});
	EventType.associate = function (models) {
		EventType.hasMany(models.Event, {
			foreignKey: {
				name: 'EventTypeId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
	};
	return EventType;
};