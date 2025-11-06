import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface, Sequelize) => {
  // Lấy admin user để làm created_by
  const [adminUser] = await queryInterface.sequelize.query(
    `SELECT id FROM users WHERE email = 'minhnguyen160103@gmail.com' LIMIT 1;`
  );

  const adminId = adminUser.length > 0 ? adminUser[0].id : uuidv4();

  await queryInterface.bulkInsert(
    "products",
    [
      {
        id: uuidv4(),
        name: "iPhone 15 Pro Max",
        description:
          "The latest flagship iPhone with A17 Pro chip, titanium design, and advanced camera system",
        price: 1199.99,
        category: "Smartphones",
        ratings: 4.8,
        images: JSON.stringify([
          {
            public_id: "products/iphone15pro",
            url: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iphone_15/Cate-iphone-15-14.jpg",
            // url:"https://cdn.mos.cms.futurecdn.net/hUQHCvvKAHtNGxtLiB8rjP.gif"
            // url:"https://images.steamusercontent.com/ugc/2084659468018420189/6CA10CC3103D5C119D237B6D336FD8657A19FA03/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
          },
        ]),
        stock: 50,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Samsung Galaxy S24 Ultra",
        description:
          "Premium Android flagship with S Pen, 200MP camera, and powerful Snapdragon processor",
        price: 1099.99,
        category: "Smartphones",
        ratings: 4.7,
        images: JSON.stringify([
          {
            public_id: "products/galaxys24",
            url: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png",
          },
        ]),
        stock: 40,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'MacBook Pro 16" M3 Max',
        description:
          "Professional laptop with M3 Max chip, stunning Liquid Retina XDR display, up to 128GB RAM",
        price: 3499.99,
        category: "Laptops",
        ratings: 5.0,
        images: JSON.stringify([
          {
            public_id: "products/macbookpro16",
            url: "https://macstores.vn/wp-content/uploads/2023/12/macbook-pro-16-inch-m3-max-2023-48gb-ram-1tb-ssd-2.jpg",
          },
        ]),
        stock: 25,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Dell XPS 15",
        description:
          "Premium Windows laptop with InfinityEdge display, Intel Core i9, and NVIDIA graphics",
        price: 2299.99,
        category: "Laptops",
        ratings: 4.6,
        images: JSON.stringify([
          {
            public_id: "products/dellxps15",
            url: "https://images-cdn.ubuy.co.in/6350369f57967578e933e9e5-dell-xps-15-9520-laptop-2022.jpg",
          },
        ]),
        stock: 30,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Sony WH-1000XM5",
        description:
          "Industry-leading noise canceling headphones with premium sound quality and comfort",
        price: 399.99,
        category: "Audio",
        ratings: 4.9,
        images: JSON.stringify([
          {
            public_id: "products/sonywh1000xm5",
            url: "https://cdn.shopify.com/s/files/1/0791/9344/0574/files/WH-1000XM5-001.jpg",
          },
        ]),
        stock: 100,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "AirPods Pro (2nd Gen)",
        description:
          "Premium wireless earbuds with Active Noise Cancellation and Spatial Audio",
        price: 249.99,
        category: "Audio",
        ratings: 4.7,
        images: JSON.stringify([
          {
            public_id: "products/airpodspro2",
            //  url: 'https://shopdunk.com/images/thumbs/0000211_airpods-pro-2.png'
            url: "https://i.pinimg.com/originals/3e/9d/91/3e9d915b1f5f4c48bebd0a6c424eed6b.gif",
          },
        ]),
        stock: 150,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'iPad Pro 12.9" M2',
        description:
          "Most powerful iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support",
        price: 1099.99,
        category: "Tablets",
        ratings: 4.8,
        images: JSON.stringify([
          {
            public_id: "products/ipadpro129",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP3GdjFwKgK6KTGAzTTZ0SB5mgDBjaFgKOnA&s",
          },
        ]),
        stock: 60,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Apple Watch Series 9",
        description:
          "Advanced health and fitness smartwatch with always-on Retina display",
        price: 429.99,
        category: "Wearables",
        ratings: 4.7,
        images: JSON.stringify([
          {
            public_id: "products/applewatch9",
            url: "https://i.pinimg.com/originals/7a/56/08/7a56089f2227e24a5a22b3256b22e437.gif",
          },
        ]),
        stock: 80,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'LG C3 OLED 65"',
        description:
          "4K OLED TV with perfect blacks, vibrant colors, and gaming features",
        price: 1999.99,
        category: "TVs",
        ratings: 4.9,
        images: JSON.stringify([
          {
            public_id: "products/lgc3oled",
            url: "https://i.ebayimg.com/images/g/KkgAAOSwYZNk7OYo/s-l1200.jpg",
          },
        ]),
        stock: 20,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "PlayStation 5",
        description:
          "Next-gen gaming console with ultra-high speed SSD and stunning graphics",
        price: 499.99,
        category: "Gaming",
        ratings: 4.8,
        images: JSON.stringify([
          {
            public_id: "products/ps5",
            url: "https://cdn.mos.cms.futurecdn.net/HkdMToxijoHfz4JwUgfh3G-1920-80.jpg",
          },
        ]),
        stock: 35,
        created_by: adminId,
        created_at: new Date(),
      },
    ],
    {}
  );
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete("products", null, {});
};
