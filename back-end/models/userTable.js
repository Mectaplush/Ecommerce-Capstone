import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      defaultValue: 'User',
      validate: {
        isIn: [['User', 'Admin']],
      },
    },
    avatar: {
      type: DataTypes.JSONB,
      defaultValue: null,
    },
    reset_password_token: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    reset_password_expire: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  // Define associations
  users.associate = (models) => {
    users.hasMany(models.products, {
      foreignKey: 'created_by',
      as: 'products',
    });
    users.hasMany(models.orders, {
      foreignKey: 'buyer_id',
      as: 'orders',
    });
  };

  return users;
};
