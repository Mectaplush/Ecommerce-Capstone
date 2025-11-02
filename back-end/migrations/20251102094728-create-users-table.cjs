'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(10),
        defaultValue: 'User',
        allowNull: false,
      },
      avatar: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: null,
      },
      reset_password_token: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      reset_password_expire: {
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

    // Thêm index cho email để tăng tốc độ tìm kiếm
    await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'users_email_unique_idx',
    });

    // Thêm index cho role để filter users theo vai trò
    await queryInterface.addIndex('users', ['role'], {
      name: 'users_role_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
