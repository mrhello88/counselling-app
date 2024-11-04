import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { paymentFormSchema } from "../zod-validation/paymentZod";
export const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { postCounselingSession, postCounselorAdvice } = useAuth();
  const [errors, setErrors] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    setErrors((prevError) => ({ ...prevError, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = paymentFormSchema.safeParse(paymentInfo);
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }
    if (location.state.scheduleSessionData) {
      const { scheduleSessionData } = location.state;
      const response = await postCounselingSession(scheduleSessionData);
      if (response.success) {
        navigate("/user-dashboard");
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
          {/* Card Number */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9123 4567"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={paymentInfo.cardNumber}
              onChange={handleChange}
              required
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">
                {errors.cardNumber._errors[0]}
              </p>
            )}
          </div>

          {/* Cardholder Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="cardHolder"
            >
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              placeholder="John Doe"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={paymentInfo.cardHolder}
              onChange={handleChange}
              required
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-sm">
                {errors.cardHolder._errors[0]}
              </p>
            )}
          </div>

          {/* Expiration Date */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="expirationDate"
            >
              Expiration Date
            </label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              placeholder="MM/YY"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={paymentInfo.expirationDate}
              onChange={handleChange}
              required
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm">
                {errors.expirationDate._errors[0]}
              </p>
            )}
          </div>

          {/* CVV */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="cvv"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={paymentInfo.cvv}
              onChange={handleChange}
              required
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm">{errors.cvv._errors[0]}</p>
            )}
          </div>

          {/* Billing Address */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="billingAddress"
            >
              Billing Address
            </label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              placeholder="123 Main St, City, Country"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={paymentInfo.billingAddress}
              onChange={handleChange}
              required
            />
            {errors.billingAddress && (
              <p className="text-red-500 text-sm">
                {errors.billingAddress._errors[0]}
              </p>
            )}
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
