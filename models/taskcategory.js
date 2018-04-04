'use strict';
module.exports = (sequelize, DataTypes) => {
  var TaskCategory = sequelize.define('TaskCategory', {
    name: DataTypes.STRING
  }, {});
  TaskCategory.associate = function(models) {
    // associations can be defined here
  };
  return TaskCategory;
};