'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ratings: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 0,
        allowNull: false,
      },
      images: {
        type: Sequelize.JSONB,
        defaultValue: [],
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Thêm index cho category để filter sản phẩm theo danh mục
    await queryInterface.addIndex('products', ['category'], {
      name: 'products_category_idx',
    });

    // Thêm index cho price để sort và filter theo giá
    await queryInterface.addIndex('products', ['price'], {
      name: 'products_price_idx',
    });

    // Thêm index cho created_by để lấy sản phẩm của user
    await queryInterface.addIndex('products', ['created_by'], {
      name: 'products_created_by_idx',
    });

    // Thêm index cho ratings để sort theo đánh giá
    await queryInterface.addIndex('products', ['ratings'], {
      name: 'products_ratings_idx',
    });

    // Thêm index cho stock để kiểm tra hàng tồn kho
    await queryInterface.addIndex('products', ['stock'], {
      name: 'products_stock_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
