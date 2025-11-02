import { v4 as uuidv4 } from 'uuid';

export const up = async (queryInterface, Sequelize) => {
    // Lấy orders và user info
    const [ordersWithUsers] = await queryInterface.sequelize.query(
      `SELECT o.id as order_id, o.created_at, u.name, u.email 
       FROM orders o 
       JOIN users u ON o.buyer_id = u.id 
       ORDER BY o.created_at;`
    );

    if (ordersWithUsers.length === 0) {
      console.log('Orders not found. Please seed orders first.');
      return;
    }

    const shippingInfos = [];

    // Predefined shipping addresses for variety
    const addresses = [
      {
        full_name: 'John Doe',
        state: 'California',
        city: 'Los Angeles',
        country: 'USA',
        address: '1234 Sunset Boulevard, Apt 56',
        pincode: '90028',
        phone: '+1-310-555-0123'
      },
      {
        full_name: 'John Doe',
        state: 'California',
        city: 'San Francisco',
        country: 'USA',
        address: '789 Market Street, Floor 3',
        pincode: '94103',
        phone: '+1-415-555-0456'
      },
      {
        full_name: 'Jane Smith',
        state: 'New York',
        city: 'New York City',
        country: 'USA',
        address: '567 Fifth Avenue, Suite 200',
        pincode: '10017',
        phone: '+1-212-555-0789'
      },
      {
        full_name: 'Jane Smith',
        state: 'New York',
        city: 'Brooklyn',
        country: 'USA',
        address: '321 Bedford Avenue',
        pincode: '11211',
        phone: '+1-718-555-0234'
      },
      {
        full_name: 'Test User',
        state: 'Texas',
        city: 'Austin',
        country: 'USA',
        address: '456 Congress Avenue',
        pincode: '78701',
        phone: '+1-512-555-0567'
      },
      {
        full_name: 'Test User',
        state: 'Texas',
        city: 'Houston',
        country: 'USA',
        address: '890 Main Street, Unit 12',
        pincode: '77002',
        phone: '+1-713-555-0890'
      },
      {
        full_name: 'John Doe',
        state: 'Florida',
        city: 'Miami',
        country: 'USA',
        address: '234 Ocean Drive',
        pincode: '33139',
        phone: '+1-305-555-0345'
      }
    ];

    // Create shipping info for each order
    ordersWithUsers.forEach((order, index) => {
      const addressIndex = index % addresses.length;
      const shippingAddress = addresses[addressIndex];

      shippingInfos.push({
        id: uuidv4(),
        order_id: order.order_id,
        full_name: shippingAddress.full_name,
        state: shippingAddress.state,
        city: shippingAddress.city,
        country: shippingAddress.country,
        address: shippingAddress.address,
        pincode: shippingAddress.pincode,
        phone: shippingAddress.phone
      });
    });

    await queryInterface.bulkInsert('shipping_info', shippingInfos, {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('shipping_info', null, {});
};
