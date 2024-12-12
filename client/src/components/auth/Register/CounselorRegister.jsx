import { useState } from "react";
import { useAuth } from "../../../context/Context.jsx";
import { Link } from "react-router-dom";
import { counselorPersonalInfoSchema } from "../../../zod-validation/counselorZod.js";
import { counselorEducationSchema } from "../../../zod-validation/counselorZod.js";
import { counselorPaymentSchema } from "../../../zod-validation/counselorZod.js";
import { toast } from "react-toastify";
import { LoadingOverlay } from "../../Loading/Loading.jsx";

export const CounselorRegister = () => {
  const [step, setStep] = useState(1); // Track current step
  // const { userRegister, postData, apiLoading, apiError } = useAuth();
  const { postData, apiLoading} = useAuth();

  const [Data, setData] = useState({
    personalInfo: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    education: {
      degree: "",
      institution: "",
      experience: "",
      description: "",
    },
    payment: {
      accountNumber: "",
      bankName: "",
      branchCode: "",
    },
    file: null,
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (section, key, value) => {
    if (section === "Files") {
      // If updating the file field
      setData((prevData) => ({
        ...prevData,
        file: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "", // Clear any file-related errors
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [key]: value,
        },
        role: "counselor",
        [key]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [section]: { ...prevErrors[section], [key]: "" },
      }));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={Data.personalInfo.name}
                onChange={(e) =>
                  handleInputChange("personalInfo", "name", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.personalInfo?.name && (
                <p className="text-red-500">
                  {errors.personalInfo.name._errors.join(", ")}
                </p>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={Data.personalInfo.email}
                onChange={(e) =>
                  handleInputChange("personalInfo", "email", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.personalInfo?.email && (
                <p className="text-red-500">
                  {errors.personalInfo.email._errors.join(", ")}
                </p>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={Data.personalInfo.password}
                onChange={(e) =>
                  handleInputChange("personalInfo", "password", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.personalInfo?.password && (
                <p className="text-red-500">
                  {errors.personalInfo.password._errors.join(", ")}
                </p>
              )}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={Data.personalInfo.confirmPassword}
                onChange={(e) =>
                  handleInputChange(
                    "personalInfo",
                    "confirmPassword",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.personalInfo?.confirmPassword && (
                <p className="text-red-500">
                  {errors.personalInfo.confirmPassword._errors.join(", ")}
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <Link
                to="/login/counselor"
                className="text-blue-500 text-sm hover:underline"
              >
                Login
              </Link>
            </div>
          </>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Educational Information</h2>
            <select
              value={Data.education.degree}
              onChange={(e) =>
                handleInputChange("education", "degree", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Degree
              </option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
              <option value="Associate's">Associate's</option>
              <option value="Diploma">Diploma</option>
              <option value="Certificate">Certificate</option>
            </select>
            {errors?.education?.degree && (
              <p className="text-red-500">
                {errors?.education?.degree._errors.join(", ")}
              </p>
            )}
            <select
              value={Data.education.institution}
              onChange={(e) =>
                handleInputChange("education", "institution", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Institution
              </option>
              <option value="University of the Punjab">
                University of the Punjab
              </option>
              <option value="National University of Sciences and Technology (NUST)">
                National University of Sciences and Technology (NUST)
              </option>
              <option value="Lahore University of Management Sciences (LUMS)">
                Lahore University of Management Sciences (LUMS)
              </option>
              <option value="COMSATS Institute of Information Technology">
                COMSATS Institute of Information Technology
              </option>
              <option value="University of Karachi">
                University of Karachi
              </option>
              <option value="Aga Khan University">Aga Khan University</option>
              <option value="Quaid-i-Azam University">
                Quaid-i-Azam University
              </option>
              <option value="Institute of Business Administration (IBA)">
                Institute of Business Administration (IBA)
              </option>
              <option value="Government College University (GCU), Lahore">
                Government College University (GCU), Lahore
              </option>
              <option value="University of Engineering and Technology (UET)">
                University of Engineering and Technology (UET)
              </option>
            </select>
            {errors?.education?.institution && (
              <p className="text-red-500">
                {errors?.education?.institution._errors.join(", ")}
              </p>
            )}
            <select
              value={Data.education.experience}
              onChange={(e) =>
                handleInputChange("education", "experience", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Experience
              </option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="5 years">5 years</option>
              <option value="5-10 years">5 to 10 years</option>
            </select>
            {errors?.education?.experience && (
              <p className="text-red-500">
                {errors?.education?.experience._errors.join(", ")}
              </p>
            )}
            <textarea
              value={Data.education.description}
              onChange={(e) => {
                handleInputChange("education", "description", e.target.value);
              }}
              placeholder="Enter a brief description (max 200 words or least 10 words)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
            />
            {errors?.education?.description?._errors && (
              <p className="text-red-500">
                {errors.education.description._errors[0]}
              </p>
            )}
            <input
              type="file"
              accept="application/pdf"
              name="file"
              multiple
              onChange={(e) => {
                handleInputChange("Files", "file", e.target.files[0]);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.file && (
              <p className="text-red-500">{errors.file._errors[0]}</p>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Account Details</h2>
            <input
              type="text"
              placeholder="Account Number"
              value={Data.payment.accountNumber}
              onChange={(e) =>
                handleInputChange("payment", "accountNumber", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.payment?.accountNumber && (
              <p className="text-red-500">
                {errors?.payment?.accountNumber._errors.join(", ")}
              </p>
            )}
            <input
              type="text"
              placeholder="Bank Name"
              value={Data.payment.bankName}
              onChange={(e) =>
                handleInputChange("payment", "bankName", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.payment?.bankName && (
              <p className="text-red-500">
                {errors?.payment?.bankName._errors.join(", ")}
              </p>
            )}
            <input
              type="text"
              placeholder="Branch Code"
              value={Data.payment.branchCode}
              onChange={(e) =>
                handleInputChange("payment", "branchCode", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.payment?.branchCode && (
              <p className="text-red-500">
                {errors?.payment?.branchCode._errors.join(", ")}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // Validate current step with Zod schema
  const validateStep = () => {
    let validationResult;
    if (step === 1) {
      validationResult = counselorPersonalInfoSchema.safeParse({
        personalInfo: Data.personalInfo,
      });
    } else if (step === 2) {
      validationResult = counselorEducationSchema.safeParse({
        education: Data.education,
        file: Data.file,
      });
    } else if (step === 3) {
      validationResult = counselorPaymentSchema.safeParse({
        payment: Data.payment,
      });
    }

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors(fieldErrors);
      toast.error(`please fix all the fields`);
      return true;
    }

    setErrors({});
    return false;
  };

  const handleNext = () => {
    const hasError = validateStep();
    if (!hasError) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (step === 4) {
      const data = {
        personalInfo: Data.personalInfo,
        education: Data.education,
        payment: Data.payment,
        role: "counselor",
      };
      const formData = new FormData();
      // Append nested objects individually as JSON strings
      formData.append("registerUser", JSON.stringify(data));
      // Add the file if it exists
      formData.append("file", Data.file);
      try {
        const responseData = await postData(
          "http://localhost:3000/register",
          formData
        );
        if (responseData.success) {
          toast.success(responseData.message);
          // Reset form and error
          setErrors({});
          setStep(1);
          setData({
            personalInfo: {
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            },
            education: {
              degree: "",
              institution: "",
              experience: "",
              description: "",
            },
            payment: {
              accountNumber: "",
              bankName: "",
              branchCode: "",
            },
            file: null,
          });
        } else {
          toast.error(responseData.message || "Registration failed.");
          setStep(3);
        }
      } catch (error) {
        toast.error("An unexpected error occurred during registration.");
      }
    }
  };
  if (apiLoading) {
    return apiLoading && <LoadingOverlay />;
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={(e) => submitHandler(e)}
          className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
        >
          {renderStep()}
          <div className="flex justify-between mt-6">
            <button
              type="button" // Explicitly set type to "button"
              className={`px-4 py-2 rounded text-primary bg-secondary hover:text-black font-bold text-xl duration-300 hover:scale-110 ${
                step === 1
                  ? "bg-primary cursor-not-allowed"
                  : "hover:bg-secondary"
              }`}
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Previous
            </button>
            {step < 3 ? (
              <>
                <button
                  type="button" // Explicitly set type to "button"
                  className="px-4 py-2 rounded text-primary bg-secondary hover:text-black font-bold text-xl duration-300 hover:scale-110"
                  onClick={handleNext}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 rounded text-primary bg-secondary hover:text-black font-bold text-xl duration-300 hover:scale-110"
                  type="submit" // This button is the submit button
                  onClick={handleNext}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
