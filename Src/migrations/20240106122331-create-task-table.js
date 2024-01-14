"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tasks", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      taskTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      taskDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assignBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assignTo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      taskStatus: {
        type: Sequelize.ENUM("pending", "started", "onprogress", "completed"),
        allowNull: false,
        default: "pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tasks");
  },
};
