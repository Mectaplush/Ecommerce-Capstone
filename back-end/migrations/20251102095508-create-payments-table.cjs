'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
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
      payment_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      payment_intent_id: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Thêm unique index cho order_id (mỗi đơn hàng chỉ có 1 payment)
    await queryInterface.addIndex('payments', ['order_id'], {
      unique: true,
      name: 'payments_order_id_unique_idx',
    });

    // Thêm unique index cho payment_intent_id (Stripe payment intent)
    await queryInterface.addIndex('payments', ['payment_intent_id'], {
      unique: true,
      name: 'payments_intent_id_unique_idx',
    });

    // Thêm index cho payment_status để filter theo trạng thái thanh toán
    await queryInterface.addIndex('payments', ['payment_status'], {
      name: 'payments_status_idx',
    });

    // Thêm index cho payment_type để thống kê theo phương thức thanh toán
    await queryInterface.addIndex('payments', ['payment_type'], {
      name: 'payments_type_idx',
    });

    // Thêm index cho created_at để sort theo thời gian
    await queryInterface.addIndex('payments', ['created_at'], {
      name: 'payments_created_at_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};
