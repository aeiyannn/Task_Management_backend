"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Change the column's allowNull property to false
    await queryInterface.changeColumn("tasks", "priority", {
      type: Sequelize.DataTypes.ENUM("low", "normal", "high"),
      allowNull: true, // Change allowNull to false
    });
  },
  async down(queryInterface, Sequelize) {
    // Revert the changes made in the up function
    await queryInterface.changeColumn("tasks", "priority", {
      type: Sequelize.DataTypes.ENUM("low", "normal", "high"),
      allowNull: true, // Revert allowNull to true if necessary
    });
  },
};
