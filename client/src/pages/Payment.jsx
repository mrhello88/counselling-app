import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
// import { paymentFormSchema } from "../zod-validation/paymentZod";
// import { LoadingOverlay } from "../components/Loading/Loading";
import { toast } from "react-toastify";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { postData, setRefreshFlag } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  // const [errors, setErrors] = useState({});
  // const [paymentInfo, setPaymentInfo] = useState({
  //   cardNumber: "",
  //   cardHolder: "",
  //   expirationDate: "",
  //   cvv: "",
  //   billingAddress: "",
  // });

  // const handleChange = (e) => {
  //   setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  //   setErrors((prevError) => ({ ...prevError, [e.target.name]: "" }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const result = paymentFormSchema.safeParse(paymentInfo);
    // if (!result.success) {
    //   const fieldErrors = result.error.format();
    //   setErrors(fieldErrors);
    //   toast.error("Please fix the errors in the form.");
    //   return;
    // }

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (location?.state?.scheduleSessionData) {
      try {
        const { scheduleSessionData } = location.state;
        const counselingResponseData = await postData(
          `${process.env.BACKEND_URL}/api/counseling-schedule`,
          { ...scheduleSessionData, paymentMethodId: paymentMethod.id }
        );
        if (counselingResponseData.success) {
          setRefreshFlag(true);
          toast.success(counselingResponseData.message);
          navigate("/dashboard");
        } else {
          toast.error(counselingResponseData.message);
        }
      } catch (error) {
        toast.error(
          "An unexpected error occurred while post counseling schedule"
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Payment Details
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Card Element */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Card Details
            </label>
            <CardElement className="border border-gray-300 rounded-md p-2 w-full" />
          </div>

          {/* Pay Now Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};
