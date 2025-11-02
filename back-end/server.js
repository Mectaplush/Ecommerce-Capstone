import { config } from "dotenv";
import dotenv from "dotenv";
//config({ path: "./config/config.env" });
dotenv.config();
// Log để kiểm tra
console.log('✅ Environment variables loaded');
console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY ? '✓ Loaded' : '✗ Missing');
console.log('DB Host:', process.env.PG_HOST ? '✓ Loaded' : '✗ Missing');


import { v2 as cloudinary } from "cloudinary";
import express from "express";
import sequelize from "./models/index.js";
import rootRouter from "./router/rootRouter.js";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", rootRouter);

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();