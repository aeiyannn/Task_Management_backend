"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("tasks", "priority", {
            type: Sequelize.DataTypes.ENUM(
                "pending",
                "started",
                "onprogress",
                "complete",
                "notcomplete"
            ),
            allowNull: false, // Change allowNull to false if needed
            defaultValue: "pending",
        });
    },

    async down(queryInterface, Sequelize) {
        // Remove the column in case of a rollback
        await queryInterface.removeColumn("tasks", "priority");
    },
};
