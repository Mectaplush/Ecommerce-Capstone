import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const payments = sequelize.define('payments', {
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
    payment_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['Online']],
      },
    },
    payment_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['Paid', 'Pending', 'Failed']],
      },
    },
    payment_intent_id: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true,
    },
  }, {
    tableName: 'payments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  // Define associations
  payments.associate = (models) => {
    payments.belongsTo(models.orders, {
      foreignKey: 'order_id',
      as: 'order',
    });
  };

  return payments;
};
