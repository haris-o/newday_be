'use strict';

var faker = require('faker');

module.exports = {
	up: (queryInterface, Sequelize) => {
		let users = [];
		for (let i = 0; i < 100; i++) {
			users.push({
				//id: 'id',
				//username
				//full_name
				//email
				//token
				//password
				//UserRoleId
				//createdAt
				//updatedAt
			});
		}
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
	}
};
