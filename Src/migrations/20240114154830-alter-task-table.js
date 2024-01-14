"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("tasks", "priority", {
      type: Sequelize.DataTypes.ENUM("low", "high", "normal"),
      allowNull: false, // Change allowNull to false if needed
      defaultValue: "normal",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the column in case of a rollback
    await queryInterface.removeColumn("tasks", "priority");
  },
};
