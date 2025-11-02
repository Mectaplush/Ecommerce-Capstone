import { v4 as uuidv4 } from 'uuid';

export const up = async (queryInterface, Sequelize) => {
    // Lấy user IDs
    const [users] = await queryInterface.sequelize.query(
      `SELECT id, email FROM users WHERE email IN ('minhnguyen160103@gmail.com', 'phucnguyen@gmail.com', 'hoa@gmail.com', 'user@gmail.com');`
    );

    const minhUser = users.find(u => u.email === 'minhnguyen160103@gmail.com');
    const phucUser = users.find(u => u.email === 'phucnguyen@gmail.com');
    const hoaUser = users.find(u => u.email === 'hoa@gmail.com');
    const testUser = users.find(u => u.email === 'user@gmail.com');

    if (!minhUser || !phucUser || !hoaUser || !testUser) {
      console.log('Users not found. Please seed users first.');
      return;
    }

    await queryInterface.bulkInsert('orders', [
      {
        id: uuidv4(),
        buyer_id: minhUser.id,
        total_price: 1449.98,
        tax_price: 144.99,
        shipping_price: 15.00,
        order_status: 'Delivered',
        paid_at: new Date('2024-10-15T10:30:00'),
        created_at: new Date('2024-10-15T10:00:00')
      },
      {
        id: uuidv4(),
        buyer_id: minhUser.id,
        total_price: 429.99,
        tax_price: 42.99,
        shipping_price: 10.00,
        order_status: 'Shipped',
        paid_at: new Date('2024-10-25T14:20:00'),
        created_at: new Date('2024-10-25T14:00:00')
      },
      {
        id: uuidv4(),
        buyer_id: phucUser.id,
        total_price: 3644.98,
        tax_price: 364.49,
        shipping_price: 0.00,
        order_status: 'Delivered',
        paid_at: new Date('2024-10-20T09:15:00'),
        created_at: new Date('2024-10-20T09:00:00')
      },
      {
        id: uuidv4(),
        buyer_id: phucUser.id,
        total_price: 1349.98,
        tax_price: 134.99,
        shipping_price: 15.00,
        order_status: 'Processing',
        paid_at: new Date('2024-11-01T11:00:00'),
        created_at: new Date('2024-11-01T11:00:00')
      },
      {
        id: uuidv4(),
        buyer_id: hoaUser.id,
        total_price: 649.98,
        tax_price: 64.99,
        shipping_price: 10.00,
        order_status: 'Delivered',
        paid_at: new Date('2024-10-18T16:45:00'),
        created_at: new Date('2024-10-18T16:30:00')
      },
      {
        id: uuidv4(),
        buyer_id: hoaUser.id,
        total_price: 2299.99,
        tax_price: 229.99,
        shipping_price: 0.00,
        order_status: 'Processing',
        paid_at: new Date('2024-11-02T08:30:00'),
        created_at: new Date('2024-11-02T08:00:00')
      },
      {
        id: uuidv4(),
        buyer_id: testUser.id,
        total_price: 1099.99,
        tax_price: 109.99,
        shipping_price: 15.00,
        order_status: 'Pending',
        paid_at: null,
        created_at: new Date('2024-11-02T10:00:00')
      }
    ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('orders', null, {});
};
