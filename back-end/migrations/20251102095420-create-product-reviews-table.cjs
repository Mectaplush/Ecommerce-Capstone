'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
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
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Thêm index cho product_id để lấy reviews của sản phẩm
    await queryInterface.addIndex('reviews', ['product_id'], {
      name: 'reviews_product_id_idx',
    });

    // Thêm index cho user_id để lấy reviews của user
    await queryInterface.addIndex('reviews', ['user_id'], {
      name: 'reviews_user_id_idx',
    });

    // Thêm index cho rating để filter theo đánh giá
    await queryInterface.addIndex('reviews', ['rating'], {
      name: 'reviews_rating_idx',
    });

    // Thêm composite index để kiểm tra user đã review sản phẩm chưa
    await queryInterface.addIndex('reviews', ['product_id', 'user_id'], {
      name: 'reviews_product_user_idx',
      unique: true, // Một user chỉ review một sản phẩm 1 lần
    });

    // Thêm index cho created_at để sort theo thời gian
    await queryInterface.addIndex('reviews', ['created_at'], {
      name: 'reviews_created_at_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};
