import { v4 as uuidv4 } from 'uuid';

export const up = async (queryInterface, Sequelize) => {
    // Lấy user IDs
    const [users] = await queryInterface.sequelize.query(
      `SELECT id, email FROM users WHERE email IN ('minhnguyen160103@gmail.com', 'phucnguyen@gmail.com', 'hoa@gmail.com', 'user@gmail.com');`
    );
    
    // Lấy product IDs
    const [products] = await queryInterface.sequelize.query(
      `SELECT id, name FROM products LIMIT 10;`
    );

    if (users.length === 0 || products.length === 0) {
      console.log('Users or Products not found. Please seed them first.');
      return;
    }

    const minhUser = users.find(u => u.email === 'minhnguyen160103@gmail.com');
    const phucUser = users.find(u => u.email === 'phucnguyen@gmail.com');
    const hoaUser = users.find(u => u.email === 'hoa@gmail.com');
    const testUser = users.find(u => u.email === 'user@gmail.com');

    const reviews = [];

    // iPhone 15 Pro Max reviews
    if (products[0]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[0].id,
        user_id: minhUser.id,
        rating: 5.00,
        comment: 'Absolutely amazing phone! The camera quality is outstanding and the A17 Pro chip is incredibly fast. Best iPhone yet!',
        created_at: new Date('2024-10-16T14:30:00')
      });
      reviews.push({
        id: uuidv4(),
        product_id: products[0].id,
        user_id: phucUser.id,
        rating: 4.50,
        comment: 'Great phone overall, but the price is quite high. Camera is excellent for photography.',
        created_at: new Date('2024-10-22T09:15:00')
      });
    }

    // Samsung Galaxy S24 Ultra reviews
    if (products[1]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[1].id,
        user_id: testUser.id,
        rating: 4.80,
        comment: 'The S Pen is a game changer! Display is stunning and battery life is impressive.',
        created_at: new Date('2024-10-19T11:20:00')
      });
      reviews.push({
        id: uuidv4(),
        product_id: products[1].id,
        user_id: minhUser.id,
        rating: 4.60,
        comment: 'Solid Android flagship. The 200MP camera takes incredible photos.',
        created_at: new Date('2024-10-28T16:45:00')
      });
    }

    // MacBook Pro 16" reviews
    if (products[2]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[2].id,
        user_id: phucUser.id,
        rating: 5.00,
        comment: 'Perfect for professional work! M3 Max chip handles everything I throw at it. Worth every penny!',
        created_at: new Date('2024-10-21T10:00:00')
      });
      reviews.push({
        id: uuidv4(),
        product_id: products[2].id,
        user_id: testUser.id,
        rating: 5.00,
        comment: 'Best laptop I have ever owned. Battery life is incredible and performance is top-notch.',
        created_at: new Date('2024-10-25T13:30:00')
      });
    }

    // Dell XPS 15 reviews
    if (products[3]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[3].id,
        user_id: minhUser.id,
        rating: 4.50,
        comment: 'Excellent Windows laptop with beautiful display. A bit heavy but very powerful.',
        created_at: new Date('2024-10-23T15:20:00')
      });
    }

    // Sony WH-1000XM5 reviews
    if (products[4]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[4].id,
        user_id: phucUser.id,
        rating: 5.00,
        comment: 'Best noise-canceling headphones on the market! Comfort and sound quality are exceptional.',
        created_at: new Date('2024-10-17T12:00:00')
      });
      reviews.push({
        id: uuidv4(),
        product_id: products[4].id,
        user_id: testUser.id,
        rating: 4.80,
        comment: 'Amazing headphones for travel and work. Battery life lasts forever!',
        created_at: new Date('2024-10-26T14:15:00')
      });
      reviews.push({
        id: uuidv4(),
        product_id: products[4].id,
        user_id: minhUser.id,
        rating: 4.90,
        comment: 'Incredible sound quality and the noise cancellation is mind-blowing.',
        created_at: new Date('2024-10-30T10:45:00')
      });
    }

    // AirPods Pro reviews
    if (products[5]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[5].id,
        user_id: testUser.id,
        rating: 4.70,
        comment: 'Great earbuds with excellent ANC. Seamless integration with Apple devices.',
        created_at: new Date('2024-10-20T09:30:00')
      });
      reviews.push({
        id: uuidv4(),
        product_id: products[5].id,
        user_id: phucUser.id,
        rating: 4.60,
        comment: 'Very comfortable and sound quality is good. Spatial audio is impressive!',
        created_at: new Date('2024-10-27T11:00:00')
      });
    }

    // iPad Pro reviews
    if (products[6]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[6].id,
        user_id: minhUser.id,
        rating: 4.90,
        comment: 'Perfect tablet for creative work. Apple Pencil integration is flawless.',
        created_at: new Date('2024-10-24T13:45:00')
      });
    }

    // Apple Watch reviews
    if (products[7]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[7].id,
        user_id: phucUser.id,
        rating: 4.70,
        comment: 'Great fitness tracker and smartwatch. Health features are very useful.',
        created_at: new Date('2024-10-29T08:30:00')
      });
    }

    // LG C3 OLED reviews
    if (products[8]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[8].id,
        user_id: testUser.id,
        rating: 5.00,
        comment: 'Stunning picture quality! Perfect blacks and vibrant colors. Best TV for movies and gaming.',
        created_at: new Date('2024-10-31T16:00:00')
      });
    }

    // PlayStation 5 reviews
    if (products[9]) {
      reviews.push({
        id: uuidv4(),
        product_id: products[9].id,
        user_id: minhUser.id,
        rating: 4.80,
        comment: 'Next-gen gaming is amazing! Fast loading times and graphics are incredible.',
        created_at: new Date('2024-11-01T12:30:00')
      });
      reviews.push({
        id: uuidv4(),
        product_id: products[9].id,
        user_id: testUser.id,
        rating: 4.70,
        comment: 'Great console with impressive exclusives. Controller haptics add to the experience.',
        created_at: new Date('2024-11-02T09:00:00')
      });
    }

    await queryInterface.bulkInsert('reviews', reviews, {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('reviews', null, {});
};
