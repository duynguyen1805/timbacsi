"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SDT: {
        type: Sequelize.STRING,
      },
      idBacsi: {
        type: Sequelize.INTEGER,
      },
      ngay: {
        type: Sequelize.DATEONLY,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      hovaten: {
        type: Sequelize.STRING,
      },
      name_bacsi: {
        type: Sequelize.STRING,
      },
      chandoan: {
        type: Sequelize.STRING,
      },
      donthuoc: {
        type: Sequelize.STRING,
      },
      ketquaCLS: {
        type: Sequelize.STRING,
      },
      CM_heart: {
        type: Sequelize.INTEGER,
      },
      CS_heart: {
        type: Sequelize.INTEGER,
      },
      TĐ_heart: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("histories");
  },
};
