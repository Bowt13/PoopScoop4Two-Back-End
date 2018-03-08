'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    breedStats: DataTypes.JSON,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    totalVotes:DataTypes.INTEGER
  }, {
    timestamps: false
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
