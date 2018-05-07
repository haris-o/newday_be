'use strict';
module.exports = (sequelize, DataTypes) => {
	var Note = sequelize.define('Note', {
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
		body: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		timestamps: false
	});
	Note.associate = function (models) {
		Note.belongsTo(models.User, {
			foreignKey: {
				name: 'UserId',
				allowNull: false
			},
			onDelete: 'CASCADE'
		});
	};
	return Note;
};