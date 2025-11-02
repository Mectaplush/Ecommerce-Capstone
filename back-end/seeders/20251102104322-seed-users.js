import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const up = async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('12345678', 10);
    
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'minh',
        email: 'minhnguyen160103@gmail.com',
        password: hashedPassword,
        role: 'Admin',
        avatar: JSON.stringify({
          public_id: 'avatars/admin',
          url: 'https://res.cloudinary.com/demo/image/upload/avatar-admin.jpg'
        }),
        reset_password_token: null,
        reset_password_expire: null,
        created_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'phuc',
        email: 'phucnguyen@gmail.com',
        password: hashedPassword,
        role: 'Admin',
        avatar: JSON.stringify({
          public_id: 'avatars/phuc',
          url: 'https://res.cloudinary.com/demo/image/upload/avatar-phuc.jpg'
        }),
        reset_password_token: null,
        reset_password_expire: null,
        created_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'hoa',
        email: 'hoa@gmail.com',
        password: hashedPassword,
        role: 'User',
        avatar: JSON.stringify({
          public_id: 'avatars/hoa',
          url: 'https://res.cloudinary.com/demo/image/upload/avatar-hoa.jpg'
        }),
        reset_password_token: null,
        reset_password_expire: null,
        created_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'user',
        email: 'user@gmail.com',
        password: hashedPassword,
        role: 'User',
        avatar: null,
        reset_password_token: null,
        reset_password_expire: null,
        created_at: new Date()
      }
    ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('users', null, {});
};
