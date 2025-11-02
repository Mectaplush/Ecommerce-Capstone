'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      buyer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      tax_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      shipping_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      order_status: {
        type: Sequelize.STRING(50),
        defaultValue: 'Processing',
        allowNull: false,
      },
      paid_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Thêm index cho buyer_id để lấy đơn hàng của user
    await queryInterface.addIndex('orders', ['buyer_id'], {
      name: 'orders_buyer_id_idx',
    });

    // Thêm index cho order_status để filter theo trạng thái
    await queryInterface.addIndex('orders', ['order_status'], {
      name: 'orders_status_idx',
    });

    // Thêm index cho created_at để sort theo thời gian
    await queryInterface.addIndex('orders', ['created_at'], {
      name: 'orders_created_at_idx',
    });

    // Thêm index cho paid_at để kiểm tra đơn hàng đã thanh toán
    await queryInterface.addIndex('orders', ['paid_at'], {
      name: 'orders_paid_at_idx',
    });

    // Thêm composite index cho buyer_id và order_status (tìm đơn hàng của user theo status)
    await queryInterface.addIndex('orders', ['buyer_id', 'order_status'], {
      name: 'orders_buyer_status_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
