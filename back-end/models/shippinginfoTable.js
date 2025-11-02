import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const shipping_info = sequelize.define('shipping_info', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    tableName: 'shipping_info',
    timestamps: false,
  });

  // Define associations
  shipping_info.associate = (models) => {
    shipping_info.belongsTo(models.orders, {
      foreignKey: 'order_id',
      as: 'order',
    });
  };

  return shipping_info;
};
