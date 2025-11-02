import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const products = sequelize.define('products', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ratings: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    images: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  // Define associations
  products.associate = (models) => {
    products.belongsTo(models.users, {
      foreignKey: 'created_by',
      as: 'creator',
    });
    products.hasMany(models.order_items, {
      foreignKey: 'product_id',
      as: 'orderItems',
    });
    products.hasMany(models.reviews, {
      foreignKey: 'product_id',
      as: 'reviews',
    });
  };

  return products;
};