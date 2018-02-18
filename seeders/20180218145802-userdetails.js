'use strict';

var faker = require('faker');

module.exports = {
	up: (queryInterface, Sequelize) => {
		let userDetails = [];
		//for (let i = 10; i < 15; i++) {
		userDetails.push({
			UserId: '14',
			createdAt: '2018-02-18T08:09:33.027Z',
			updatedAt: '2018-02-18T15:44:49.004Z'
		});

		console.log(userDetails[userDetails.length - 1]);
		//}

		return queryInterface.bulkInsert('UserDetails', userDetails, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('UserDetails', null);
	}
};
