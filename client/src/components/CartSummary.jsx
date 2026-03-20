import React, { useContext, useState } from "react";
import "./styles/CartSummary.css";
import { AppContext } from "../context/AppContext";
import ReceiptPopup from "./ReceiptPopup";
import { createOrder, deleteOrder } from "../service/OrderSevice";
import toast from "react-hot-toast";
import { createRazorpayOrder, verifyPayment } from "../service/PaymentService";
import { AppConstants } from "../util/Constants";

const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { cartItems, clearCart } = useContext(AppContext);

  const totalAmout = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = totalAmout * 0.01;
  const grandTotal = totalAmout + tax;

  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please customer details");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      subTotal: totalAmout,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };
    setIsProcessing(true);

    try {
      const res = await createOrder(orderData);
      const data = res.data;

      if (res.status === 201 && paymentMode === "cash") {
        toast.success("Cash received");
        setOrderDetails(data);
      } else if (res.status === 201 && paymentMode === "upi") {
        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
          toast.error("unable to load razorpay");
          await deleteOrderOnFailure(data.orderId);
          return;
        }

        //create razorpay order
        const razorpayResponse = await createRazorpayOrder({
          amount: grandTotal,
          currency: "INR",
        });
        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          order_id: razorpayResponse.data.id,
          name: "Retail Shop",
          description: "Order Payment",
          handler: async function (response) {
            await verifyPaymentHandler(response, data);
          },
          prefill: {
            name: customerName,
            contact: mobileNumber,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(data.orderId);
              toast.error("Payment cancelled");
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on("Payment.failed", async (response) => {
          await deleteOrderOnFailure(data.orderId);
          toast.error("Payment failed");
          console.error(response.error.description);
        });

        razorpay.open();
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (response, data) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: data.orderId,
    };

    try {
      const responsePayment = await verifyPayment(paymentData);
      if (responsePayment.status === 200) {
        toast.success("Payment successfull");
        setOrderDetails({
          ...data,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          },
        });
      } else {
        toast.error("Paymetn processing failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Paymetn processing failed");
    }
  };

  return (
    <div className="mt-2" style={{ height: "100%", overflowY: "auto" }}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="cart-summary-details">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-light">Item : </span>
            <span className="text-light">₹ {totalAmout.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-light">Tax (1%): </span>
            <span className="text-light">{tax.toFixed(2)} </span>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <span className="text-light">Total: </span>
            <span className="text-light">{grandTotal.toFixed(2)} </span>
          </div>
        </div>
        <div>
          <div className="d-flex gap-3">
            <button
              className="btn btn-success flex-grow-1"
              onClick={() => completePayment("cash")}
              disabled={isProcessing}
            >
              {isProcessing ? "processing..." : "Cash"}
            </button>
            <button
              className="btn btn-primary flex-grow-1"
              onClick={() => completePayment("upi")}
              disabled={isProcessing}
            >
              {isProcessing ? "processing..." : "UPI"}
            </button>
          </div>
          <div className="d-flex gap-3 mt-3">
            <button
              className="btn btn-warning flex-grow-1"
              onClick={placeOrder}
              disabled={isProcessing || !orderDetails}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <ReceiptPopup
          orderDetails={orderDetails}
          onClose={() => setShowPopup(false)}
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default CartSummary;
