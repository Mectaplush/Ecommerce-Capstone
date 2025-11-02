import { v4 as uuidv4 } from 'uuid';

export const up = async (queryInterface, Sequelize) => {
    // Lấy orders
    const [orders] = await queryInterface.sequelize.query(
      `SELECT id, buyer_id, created_at FROM orders ORDER BY created_at;`
    );
    
    // Lấy products
    const [products] = await queryInterface.sequelize.query(
      `SELECT id, name, price, images FROM products;`
    );

    if (orders.length === 0 || products.length === 0) {
      console.log('Orders or Products not found. Please seed them first.');
      return;
    }

    const order_items = [];

    // Helper function to get product image URL
    const getProductImage = (images) => {
      try {
        const parsed = typeof images === 'string' ? JSON.parse(images) : images;
        return parsed && parsed.length > 0 ? parsed[0].url : 'https://via.placeholder.com/150';
      } catch (e) {
        return 'https://via.placeholder.com/150';
      }
    };

    // Order 1 - John's first order (iPhone 15 Pro Max + AirPods Pro)
    if (orders[0] && products[0] && products[5]) {
      order_items.push({
        id: uuidv4(),
        order_id: orders[0].id,
        product_id: products[0].id, // iPhone 15 Pro Max
        quantity: 1,
        price: 1199.99,
        image: getProductImage(products[0].images),
        title: products[0].name,
        created_at: orders[0].created_at
      });
      order_items.push({
        id: uuidv4(),
        order_id: orders[0].id,
        product_id: products[5].id, // AirPods Pro
        quantity: 1,
        price: 249.99,
        image: getProductImage(products[5].images),
        title: products[5].name,
        created_at: orders[0].created_at
      });
    }

    // Order 2 - John's second order (Apple Watch)
    if (orders[1] && products[7]) {
      order_items.push({
        id: uuidv4(),
        order_id: orders[1].id,
        product_id: products[7].id, // Apple Watch
        quantity: 1,
        price: 429.99,
        image: getProductImage(products[7].images),
        title: products[7].name,
        created_at: orders[1].created_at
      });
    }

    // Order 3 - Jane's first order (MacBook Pro + Sony Headphones)
    if (orders[2] && products[2] && products[4]) {
      order_items.push({
        id: uuidv4(),
        order_id: orders[2].id,
        product_id: products[2].id, // MacBook Pro
        quantity: 1,
        price: 3499.99,
        image: getProductImage(products[2].images),
        title: products[2].name,
        created_at: orders[2].created_at
      });
      order_items.push({
        id: uuidv4(),
        order_id: orders[2].id,
        product_id: products[4].id, // Sony WH-1000XM5
        quantity: 1,
        price: 399.99,
        image: getProductImage(products[4].images),
        title: products[4].name,
        created_at: orders[2].created_at
      });
    }

    // Order 4 - Jane's second order (iPad Pro + Apple Pencil equiv)
    if (orders[3] && products[6] && products[5]) {
      order_items.push({
        id: uuidv4(),
        order_id: orders[3].id,
        product_id: products[6].id, // iPad Pro
        quantity: 1,
        price: 1099.99,
        image: getProductImage(products[6].images),
        title: products[6].name,
        created_at: orders[3].created_at
      });
      order_items.push({
        id: uuidv4(),
        order_id: orders[3].id,
        product_id: products[5].id, // AirPods Pro
        quantity: 1,
        price: 249.99,
        image: getProductImage(products[5].images),
        title: products[5].name,
        created_at: orders[3].created_at
      });
    }

    // Order 5 - Test user's first order (AirPods Pro + Sony Headphones)
    if (orders[4] && products[5] && products[4]) {
      order_items.push({
        id: uuidv4(),
        order_id: orders[4].id,
        product_id: products[5].id, // AirPods Pro
        quantity: 1,
        price: 249.99,
        image: getProductImage(products[5].images),
        title: products[5].name,
        created_at: orders[4].created_at
      });
      order_items.push({
        id: uuidv4(),
        order_id: orders[4].id,
        product_id: products[4].id, // Sony WH-1000XM5
        quantity: 1,
        price: 399.99,
        image: getProductImage(products[4].images),
        title: products[4].name,
        created_at: orders[4].created_at
      });
    }

    // Order 6 - Test user's second order (Dell XPS 15)
    if (orders[5] && products[3]) {
      order_items.push({
        id: uuidv4(),
        order_id: orders[5].id,
        product_id: products[3].id, // Dell XPS 15
        quantity: 1,
        price: 2299.99,
        image: getProductImage(products[3].images),
        title: products[3].name,
        created_at: orders[5].created_at
      });
    }

    // Order 7 - John's pending order (iPad Pro)
    if (orders[6] && products[6]) {
      order_items.push({
        id: uuidv4(),
        order_id: orders[6].id,
        product_id: products[6].id, // iPad Pro
        quantity: 1,
        price: 1099.99,
        image: getProductImage(products[6].images),
        title: products[6].name,
        created_at: orders[6].created_at
      });
    }

    await queryInterface.bulkInsert('order_items', order_items, {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('order_items', null, {});
};
