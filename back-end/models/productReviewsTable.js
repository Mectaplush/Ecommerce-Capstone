import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const reviews = sequelize.define('reviews', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'reviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  // Define associations
  reviews.associate = (models) => {
    reviews.belongsTo(models.products, {
      foreignKey: 'product_id',
      as: 'product',
    });
    reviews.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return reviews;
};
