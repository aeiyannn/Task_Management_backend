"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE tasks 
      MODIFY COLUMN taskStatus ENUM('pending', 'started', 'onprogress', 'completed', 'notcomplete') NOT NULL DEFAULT 'pending';
    `);
  },

  down: async (queryInterface, Sequelize) => {},
};
