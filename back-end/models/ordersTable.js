import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const orders = sequelize.define('orders', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    buyer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    tax_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    shipping_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    order_status: {
      type: DataTypes.STRING(50),
      defaultValue: 'Processing',
      validate: {
        isIn: [['Processing', 'Shipped', 'Delivered', 'Cancelled']],
      },
    },
    paid_at: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isBeforeNow(value) {
          if (value && value > new Date()) {
            throw new Error('paid_at cannot be in the future');
          }
        },
      },
    },
  }, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  // Define associations
  orders.associate = (models) => {
    orders.belongsTo(models.users, {
      foreignKey: 'buyer_id',
      as: 'buyer',
    });
    orders.hasMany(models.order_items, {
      foreignKey: 'order_id',
      as: 'items',
    });
    orders.hasOne(models.payments, {
      foreignKey: 'order_id',
      as: 'payment',
    });
    orders.hasOne(models.shipping_info, {
      foreignKey: 'order_id',
      as: 'shipping_info',
    });
  };

  return orders;
};
