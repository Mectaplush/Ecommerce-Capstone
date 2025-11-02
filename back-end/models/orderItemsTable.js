import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const order_items = sequelize.define('order_items', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'order_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  // Define associations
  order_items.associate = (models) => {
    order_items.belongsTo(models.orders, {
      foreignKey: 'order_id',
      as: 'order',
    });
    order_items.belongsTo(models.products, {
      foreignKey: 'product_id',
      as: 'product',
    });
  };

  return order_items;
};
