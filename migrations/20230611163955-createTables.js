"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable("Hotel", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rating: {
        defaultValue: 0,
        type: Sequelize.FLOAT,
        minvalue: 0,
        maxvalue: 5,
      },
    });

    await queryInterface.createTable("Room", {
      hotelId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: "Hotel",
          key: "id",
        },
      },
      roomType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        minvalue: 0,
      },
      numberAvailable: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      startRoomNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:1,
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
    });
    await queryInterface.createTable("Booking", {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: "User",
          key: "id",
        },
      },
      hotelId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: "Hotel",
          key: "id",
        },
      },
      cost: {
        type: Sequelize.FLOAT,
        minvalue: 0,
      },
      roomType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numRoomsBooked: {
        type: Sequelize.INTEGER,
        minvalue: 1,
      },
      startRoomNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      checkInDate: {
        type:Sequelize.DATEONLY,
      },
      checkOutDate: {
        type:Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Booking");
    await queryInterface.dropTable("Room");
    await queryInterface.dropTable("Hotel");
    await queryInterface.dropTable("User");
  },
};
