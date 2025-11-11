import { url } from "inspector";
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
        ratings: 4,
        images: JSON.stringify([
          {
            public_id: "products/iphone15pro",
            url: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iphone_15/Cate-iphone-15-14.jpg",
            // url:"https://cdn.mos.cms.futurecdn.net/hUQHCvvKAHtNGxtLiB8rjP.gif"
            // url:"https://images.steamusercontent.com/ugc/2084659468018420189/6CA10CC3103D5C119D237B6D336FD8657A19FA03/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
          },
        ]),
        stock: 20,
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
        ratings: 2,
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
        ratings: 3,
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
        ratings: 1,
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
            public_id: "products/ipadpro129-1",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP3GdjFwKgK6KTGAzTTZ0SB5mgDBjaFgKOnA&s",
          },
          {
            public_id: "products/ipadpro129-2",
            url: "https://cdn.tgdd.vn/Files/2020/03/20/1243461/ipad2020_640x360-600x400.gif",
          },
          {
            public_id: "products/ipadpro129-3",
            url: "https://cdn.dribbble.com/userupload/41040196/file/original-4732aac0c202fc83a864b8071b4c0293.gif",
          },
          {
            public_id: "products/ipadpro129-4",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxLUv90D3iCFfcA82B9goZNUTRSNaNWVuyKw&s",
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
            public_id: "products/applewatch9-1",
            url: "https://i.pinimg.com/originals/7a/56/08/7a56089f2227e24a5a22b3256b22e437.gif",
          },
          {
            public_id: "products/applewatch9-2",
            url: "https://cdn.mos.cms.futurecdn.net/vUuMdp7uxnvr9bQbeCDyAh.gif",
          },
          {
            public_id: "products/applewatch9-3",
            url: "https://cdn.dribbble.com/userupload/41751066/file/original-5e3b27908a413d34693547df203aa2c6.gif",
          },
          {
            public_id: "products/applewatch9-4",
            url: "https://i.pinimg.com/originals/c1/6c/ec/c16cecd9db6689619a8fe34d9d51e377.gif",
          },
          {
            public_id: "products/applewatch9-5",
            url: "https://i.pinimg.com/originals/6c/63/ec/6c63eca2132879065f428de2b39677ec.gif",
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
        ratings: 1,
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
        ratings: 2,
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
      {
        id: uuidv4(),
        name: "Google Pixel 8 Pro",
        description:
          "Flagship Android phone powered by Tensor G3 with advanced computational photography",
        price: 999.99,
        category: "Smartphones",
        ratings: 4,
        images: JSON.stringify([
          {
            public_id: "products/google-pixel-8-pro",
            url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/99c791f1-651f-49c8-9d4c-7205ff8615d8_ohmDbDj.gif",
          },
        ]),
        stock: 15,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "OnePlus 12",
        description:
          "Performance-focused smartphone with fast charging and smooth display",
        price: 799.99,
        category: "Smartphones",
        ratings: 1,
        images: JSON.stringify([
          {
            public_id: "products/oneplus-12",
            url: "https://oasis.opstatics.com/content/dam/oasis/page/2023/cn/12/12-green.png",
          },
        ]),
        stock: 5,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "ASUS ROG Zephyrus G14 (2025)",
        description:
          "Compact gaming laptop with high-refresh display and powerful GPU",
        price: 2199.99,
        category: "Laptops",
        ratings: 1,
        images: JSON.stringify([
          {
            public_id: "products/asus-rog-zephyrus-g14-2025",
            url: "https://dlcdnwebimgs.asus.com/gain/BA146EC2-FF9D-4A8E-A91A-C9F864DE6BBB",
          },
        ]),
        stock: 20,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "iPad Air (M2)",
        description:
          "Thin and light tablet powered by Apple M2 with Apple Pencil support",
        price: 699.99,
        category: "Tablets",
        ratings: 4,
        images: JSON.stringify([
          {
            public_id: "products/ipad-air-m2",
            url: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/ipad-air-11-inch-m2.png",
          },
        ]),
        stock: 15,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Bose QuietComfort Ultra",
        description:
          "Premium noise-cancelling headphones with immersive sound and comfort",
        price: 429.99,
        category: "Audio",
        ratings: 3,
        images: JSON.stringify([
          {
            public_id: "products/bose-qc-ultra",
            url: "https://assets.bosecreative.com/m/195214538675bfcf/original/Smalls_Dot_Orientation_LEFT_Spin_Reverse_Fade_1.gif",
          },
        ]),
        stock: 20,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Sonos One (Gen 2)",
        description:
          "Smart speaker with rich room-filling sound and voice assistant support",
        price: 219.99,
        category: "Audio",
        ratings: 2,
        images: JSON.stringify([
          {
            public_id: "products/sonos-one-gen2",
            url: "https://freight.cargo.site/t/original/i/cce885d6896e7213d30c384bb2e65717acd9530c21eea78b09d2237e95c0e77a/Large_SA_Speaker-2.gif",
          },
        ]),
        stock: 15,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Samsung Neo QLED QN90C 55"',
        description: "4K Mini LED TV with Quantum Matrix Technology and HDR",
        price: 1599.99,
        category: "TVs",
        ratings: 3.5,
        images: JSON.stringify([
          {
            public_id: "products/samsung-qn90c-55",
            url: "https://cdn.tgdd.vn/Products/Images/1942/303174/smart-tivi-neo-qled-4k-55-inch-samsung-qa55qn90c-140323-102958.jpg",
          },
        ]),
        stock: 2,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Xbox Series X",
        description:
          "Powerful next-gen gaming console with 4K gaming and fast load times",
        price: 499.99,
        category: "Gaming",
        ratings: 4,
        images: JSON.stringify([
          {
            public_id: "products/xbox-series-x",
            url: "https://miro.medium.com/v2/resize:fit:1000/1*zZlI8n3Z6ur0rz6QYmZP8g.gif",
          },
        ]),
        stock: 4,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Apple Vision Pro",
        description:
          "Spatial computing headset with micro‑OLED displays and advanced eye & hand tracking",
        price: 3499.99,
        category: "VR",
        ratings: 4.9,
        images: JSON.stringify([
          {
            public_id: "products/apple-vision-pro",
            url: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/502afc173636911.649399daee4fb.gif",
          },
        ]),
        stock: 12,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Meta Quest 3",
        description:
          "Mixed reality VR headset with high-res color passthrough and improved performance",
        price: 499.99,
        category: "VR",
        ratings: 4.6,
        images: JSON.stringify([
          {
            public_id: "products/meta-quest-3",
            url: "https://about.fb.com/wp-content/uploads/2023/09/04_Sounds.gif",
          },
        ]),
        stock: 25,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Sony PlayStation VR2",
        description:
          "Next-gen VR system with OLED HDR displays and eye tracking for PS5",
        price: 549.99,
        category: "VR",
        ratings: 4,
        images: JSON.stringify([
          {
            public_id: "products/psvr2-1",
            url: "https://old.haloshop.vn/image/catalog/products/phu-kien-game/sony-playstation/playstation-vr2-24.gif",
          },
          {
            public_id: "products/psvr2-2",
            url: "https://www.auganix.org/wp-content/uploads/2023/02/PS-VR2-controller-feedback.gif",
          },
          {
            public_id: "products/psvr2-3",
            url: "https://media.tenor.com/oUsEPtHRd6MAAAAM/playstation-playstation-5.gif",
          },
        ]),
        stock: 0,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Ray-Ban Meta Smart Glasses",
        description:
          "Stylish smart glasses with camera, audio, and hands-free sharing",
        price: 299.99,
        category: "Wearables",
        ratings: 4.3,
        images: JSON.stringify([
          {
            public_id: "products/rayban-meta",
            url: "https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/45b99e186203527.65710430981c6.gif",
          },
        ]),
        stock: 18,
        created_by: adminId,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "XREAL Air 2",
        description:
          "Lightweight AR glasses with improved brightness and color accuracy",
        price: 399.99,
        category: "Wearables",
        ratings: 3,
        images: JSON.stringify([
          {
            public_id: "products/xreal-air-2",
            url: "https://www.uploadvr.com/content/images/size/w1024/format/webp/2023/10/Xreal-Air-2-Pro-3.jpg",
          },
        ]),
        stock: 3,
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
