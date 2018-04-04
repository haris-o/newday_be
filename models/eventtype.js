'use strict';
module.exports = (sequelize, DataTypes) => {
  var EventType = sequelize.define('EventType', {
    name: DataTypes.STRING
  }, {});
  EventType.associate = function(models) {
    // associations can be defined here
  };
  return EventType;
};