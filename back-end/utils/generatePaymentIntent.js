import database from "../database/db.js";
import Stripe from "stripe";

// ✅ Tạo singleton instance
let stripeInstance = null;

function getStripeInstance() {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured in environment variables');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
}
// Vấn đề là process.env.STRIPE_SECRET_KEY vẫn 
// undefined khi file generatePaymentIntent.js 
// được import. Điều này xảy ra vì file này được 
// import TRƯỚC khi dotenv.config() chạy xong.
// Bây giờ sẽ hoạt động vì Stripe chỉ được khởi tạo khi hàm 
// generatePaymentIntent được gọi, 
// lúc đó process.env đã được load đầy đủ.

export async function generatePaymentIntent(orderId, totalPrice) {
  try {
    const paymentIntent = await getStripeInstance().paymentIntents.create({
      amount: totalPrice * 100,
      currency: "usd",
    });

    await database.query(
      "INSERT INTO payments (order_id, payment_type, payment_status, payment_intent_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [orderId, "Online", "Pending", paymentIntent.client_secret]
    );

    return { success: true, clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Payment Error:", error.message || error);
    return { success: false, message: "Payment Failed." };
  }
}
