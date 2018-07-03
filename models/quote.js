'use strict';
module.exports = (sequelize, DataTypes) => {
	var Quote = sequelize.define('Quote', {
		quote: DataTypes.STRING,
		author: DataTypes.STRING
	}, {
		timestamps: false
	});
	Quote.associate = function (models) {
		// associations can be defined here
	};
	return Quote;
};