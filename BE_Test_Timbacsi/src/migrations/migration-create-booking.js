"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // name_clinic: {
      //   type: Sequelize.STRING,
      // },
      // fullname: {
      //   type: Sequelize.STRING,
      // },
      iddv: {
        type: Sequelize.INTEGER,
      },
      idbn: {
        type: Sequelize.INTEGER,
      },
      hoten: {
        type: Sequelize.STRING,
      },
      sdt: {
        type: Sequelize.STRING,
      },
      ngaysinh: {
        type: Sequelize.DATEONLY,
      },
      diachi: {
        type: Sequelize.STRING,
      },
      Trieuchung: {
        type: Sequelize.STRING,
      },
      gioitinh: {
        type: Sequelize.STRING,
      },
      stt: {
        type: Sequelize.INTEGER,
      },
      buoikham: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.INTEGER,
      },
      ngaykham: {
        // allowNull: false,
        type: Sequelize.DATEONLY,
      },
      ngaydat: {
        // allowNull: false,
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("bookings");
  },
};
