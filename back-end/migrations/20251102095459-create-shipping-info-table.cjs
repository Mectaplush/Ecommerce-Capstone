'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shipping_info', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pincode: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    });

    // Thêm unique index cho order_id (mỗi đơn hàng chỉ có 1 địa chỉ giao hàng)
    await queryInterface.addIndex('shipping_info', ['order_id'], {
      unique: true,
      name: 'shipping_info_order_id_unique_idx',
    });

    // Thêm index cho country để thống kê theo quốc gia
    await queryInterface.addIndex('shipping_info', ['country'], {
      name: 'shipping_info_country_idx',
    });

    // Thêm index cho state để thống kê theo bang/tỉnh
    await queryInterface.addIndex('shipping_info', ['state'], {
      name: 'shipping_info_state_idx',
    });

    // Thêm index cho city để thống kê theo thành phố
    await queryInterface.addIndex('shipping_info', ['city'], {
      name: 'shipping_info_city_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shipping_info');
  }
};
