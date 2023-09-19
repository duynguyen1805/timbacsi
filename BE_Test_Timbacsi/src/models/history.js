"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class histories extends Model {
    static associate(models) {}
  }
  histories.init(
    {
      SDT: DataTypes.STRING,
      idBacsi: DataTypes.INTEGER,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      hovaten: DataTypes.STRING,
      ngay: DataTypes.DATEONLY,
      name_bacsi: DataTypes.STRING,
      chandoan: DataTypes.STRING,
      donthuoc: DataTypes.STRING,
      ketquaCLS: DataTypes.STRING,
      CM_heart: DataTypes.INTEGER,
      CS_heart: DataTypes.INTEGER,
      TĐ_heart: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "histories",
    }
  );
  return histories;
};
