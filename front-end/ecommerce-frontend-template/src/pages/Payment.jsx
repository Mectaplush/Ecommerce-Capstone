import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { placeOrder } from "../store/slices/orderSlice";

// Load Stripe once (module scope)
// const stripePromise =
//   import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
//     ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
//     : null;

const Payment = () => {
  const { authUser } = useSelector((state) => state.auth);
  const navigateTo = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authUser) navigateTo("/products");
  }, [authUser, navigateTo]);

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error("Stripe publishable key missing");
      return;
    }
    loadStripe(key)
      .then(setStripePromise)
      .catch((err) => console.error("Error loading Stripe:", err));
  }, []);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { orderStep, paymentIntent } = useSelector((state) => state.order);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    state: "Karachi",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "Viet Nam",
  });

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  let totalWithTax = total + total * 0.18;

  if (total > 50) {
    totalWithTax += 2;
  }
  // const total = cart.reduce(
  //   (sum, item) => sum + Number(item.product.price) * item.quantity,
  //   0
  // );
  // const shipping = total >= 50 ? 0 : 2;
  // const tax = total * 0.18;
  // const totalWithTax = total + tax + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", shippingDetails.fullName);
    formData.append("state", shippingDetails.state);
    formData.append("city", shippingDetails.city);
    formData.append("country", shippingDetails.country);
    formData.append("address", shippingDetails.address);
    formData.append("pincode", shippingDetails.zipCode);
    formData.append("phone", shippingDetails.phone);
    formData.append("orderItems", JSON.stringify(cart));

    dispatch(placeOrder(formData));
    // const payload = {
    //   full_name: shippingDetails.fullName,
    //   state: shippingDetails.state,
    //   city: shippingDetails.city,
    //   country: shippingDetails.country,
    //   address: shippingDetails.address,
    //   pincode: shippingDetails.zipCode,
    //   phone: shippingDetails.phone,
    //   orderedItems: cart.map((i) => ({
    //     product: { id: i.product.id }, // đủ id cho backend
    //     quantity: i.quantity,
    //     image: i.product.images?.[0]?.url || "",
    //   })),
    // };
    // dispatch(placeOrder(payload));
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="text-center glass-panel max-w-md">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            No Items in Cart.
          </h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart before processing to checkout.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg text-primary-foreground gradient-primary hover:glow-on-hover animate-smooth font-semibold"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* HEADER  */}
            <div className="flex items-center space-x-4 mb-8">
              <Link
                to="/products"
                className="p-2 glass-card hover:glow-on-hover animate-smooth"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
                <span>Back to Products</span>
              </Link>
            </div>

            {/* PROGRESS STEPS  */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4">
                {/* STEP 1  */}
                <div
                  className={`flex items-center space-x-2 ${
                    orderStep >= 1 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${
                        orderStep >= 1
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary"
                      }
                    `}
                  >
                    {orderStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                  </div>
                  <span className="font-medium">Details</span>
                </div>

                <div
                  className={`w-12 h-0 ${
                    orderStep >= 2 ? "bg-primary" : "bg-border"
                  }`}
                />

                {/* STEP 2  */}
                <div
                  className={`flex items-center space-x-2 ${
                    orderStep >= 2 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${
                        orderStep >= 2
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary"
                      }
                    `}
                  >
                    2
                  </div>
                  <span className="font-medium">Payment</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* FROM SECTION  */}
              <div className="lg:col-span-2">
                {orderStep === 1 ? (
                  // STEP 1: USER DETAIL
                  <form onSubmit={handlePlaceOrder} className="glass-panel">
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Shipping Information
                    </h2>

                    <div className="mb-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingDetails.fullName}
                          onChange={(e) =>
                            setShippingDetails({
                              ...shippingDetails,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          State *
                        </label>
                        <select
                          value={shippingDetails.state}
                          onChange={(e) =>
                            setShippingDetails({
                              ...shippingDetails,
                              state: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
                        >
                          <option value="">Select State</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                          <option value="IL">Illinois</option>
                          <option value="PA">Pennsylvania</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={shippingDetails.phone}
                          onChange={(e) =>
                            setShippingDetails({
                              ...shippingDetails,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingDetails.address}
                          onChange={(e) => {
                            setShippingDetails({
                              ...shippingDetails,
                              address: e.target.value,
                            });
                          }}
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          City *
                        </label>
                        {/* <select
                          value={shippingDetails.city}
                          onChange={(e) =>
                            setShippingDetails({
                              ...shippingDetails,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
                        >
                          <option value="">Select City</option>
                          <option value="LA">Los Angeles</option>
                          <option value="NYC">New York City</option>
                          <option value="HOU">Houston</option>
                          <option value="MIA">Miami</option>
                          <option value="CHI">Chicago</option>
                          <option value="PA">Pennsylvania</option>
                        </select> */}
                        <input
                          type="text"
                          required
                          value={shippingDetails.city}
                          onChange={(e) =>
                            setShippingDetails({
                              ...shippingDetails,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ZIP code *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingDetails.zipCode}
                          onChange={(e) =>
                            setShippingDetails({
                              ...shippingDetails,
                              zipCode: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Country *
                        </label>
                        <select
                          value={shippingDetails.country}
                          onChange={(e) =>
                            setShippingDetails({
                              ...shippingDetails,
                              country: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                          <option value="IL">Illinois</option>
                          <option value="PA">Pennsylvania</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 gradient-primary text-primary-foreground rounded-lg hover:glow-on-hover animate-smooth font-semibold"
                    >
                      Continue to Payment
                    </button>
                  </form>
                ) : (
                  <>
                    <Elements stripe={stripePromise}>
                      <PaymentForm />
                    </Elements>
                  </>
                )}
              </div>

              {/* ORDER SUMMARY  */}
              <div className="lg:col-span-1">
                <div className="glass-panel sticky top-24">
                  <h2 className="text-xl font-semibold text-foreground">
                    Order Summary
                  </h2>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => {
                      return (
                        <div
                          key={item.product.id}
                          className="flex items-center space-x-3"
                        >
                          <img
                            src={
                              item.product.images?.[0]?.url ||
                              "/placeholder.png"
                            }
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-semibold">
                            ${Number(item.product.price) * item.quantity}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2 border-t border-[hsla(var(--glass-border))] pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-500">
                        {totalWithTax >= 50 ? "free" : "$2.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{(total * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-[hsla(var(--glass-border))]">
                      <span>Total</span>
                      <span className="text-primary">
                        ${totalWithTax.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
