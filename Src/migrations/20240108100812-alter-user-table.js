"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "token", {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // Modify as per your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "token");
  },
};
