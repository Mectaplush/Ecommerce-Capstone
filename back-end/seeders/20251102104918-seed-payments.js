import { v4 as uuidv4 } from 'uuid';

export const up = async (queryInterface, Sequelize) => {
    // Lấy orders
    const [orders] = await queryInterface.sequelize.query(
      `SELECT id, order_status, paid_at, created_at FROM orders ORDER BY created_at;`
    );

    if (orders.length === 0) {
      console.log('Orders not found. Please seed orders first.');
      return;
    }

    const payments = [];

    // Helper function to generate Stripe payment intent ID
    const generatePaymentIntentId = () => {
      return `pi_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    };

    // Create payments for each order
    orders.forEach((order, index) => {
      let paymentStatus = 'pending';
      let paymentType = 'card';
      let paymentIntentId = null;

      // Determine payment status based on order status and paid_at
      if (order.paid_at) {
        paymentStatus = 'succeeded';
        paymentIntentId = generatePaymentIntentId();
      } else if (order.order_status === 'Pending') {
        paymentStatus = 'pending';
        paymentIntentId = null;
      }

      // Vary payment types
      if (index % 3 === 0) {
        paymentType = 'card';
      } else if (index % 3 === 1) {
        paymentType = 'paypal';
      } else {
        paymentType = 'stripe';
      }

      payments.push({
        id: uuidv4(),
        order_id: order.id,
        payment_type: paymentType,
        payment_status: paymentStatus,
        payment_intent_id: paymentIntentId,
        created_at: order.created_at
      });
    });

    await queryInterface.bulkInsert('payments', payments, {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('payments', null, {});
};
