'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Thêm index cho order_id để lấy items của đơn hàng
    await queryInterface.addIndex('order_items', ['order_id'], {
      name: 'order_items_order_id_idx',
    });

    // Thêm index cho product_id để tracking sản phẩm đã bán
    await queryInterface.addIndex('order_items', ['product_id'], {
      name: 'order_items_product_id_idx',
    });

    // Thêm composite index cho order_id và product_id
    await queryInterface.addIndex('order_items', ['order_id', 'product_id'], {
      name: 'order_items_order_product_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  }
};
