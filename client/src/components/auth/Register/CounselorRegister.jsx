import { useState } from "react";
import { useAuth } from "../../../store/auth";

export const CounselorRegister = () => {
  const [step, setStep] = useState(1); // Track current step
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
  });
  const [file, setFile] = useState("")

  const handleInputChange = (section, key, value) => {
    setData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value,
      },
      role: "counselor",
    }));
  };

 
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
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
          </div>
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
            <textarea
              value={Data.education.description}
              onChange={(e) => {
                const words = e.target.value.split(" ");
                if (words.length <= 200) {
                  handleInputChange("education", "description", e.target.value);
                }
              }}
              placeholder="Enter a brief description (max 200 words)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
            />
            <p className="text-sm text-gray-500">
              {Data.education.description.split(" ").length}/200 words
            </p>
            <input
              type="file"
              accept="application/pdf"
              name="file"
              multiple
              onChange={(e) => {setFile(e.target.files[0])}}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <input
              type="text"
              placeholder="Institution"
              value={Data.education.institution}
              onChange={(e) =>
                handleInputChange("education", "institution", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
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
            <input
              type="text"
              placeholder="Bank Name"
              value={Data.payment.bankName}
              onChange={(e) =>
                handleInputChange("payment", "bankName", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Branch Code"
              value={Data.payment.branchCode}
              onChange={(e) =>
                handleInputChange("payment", "branchCode", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      default:
        return null;
    }
  };
  const isNextDisabled = () => {
    const { personalInfo, education, payment } = Data;

    if (step === 1) {
      return (
        !personalInfo.name ||
        !personalInfo.email ||
        !personalInfo.password ||
        !personalInfo.confirmPassword
      );
    } else if (step === 2) {
      return (
        !education.degree ||
        !education.institution ||
        !education.experience ||
        !education.description
      );
    } 
    else if (step === 3) {
      return !payment.accountNumber || !payment.bankName || !payment.branchCode;
    }
    return false;
  };
  const handleNext = () => {
    if (!isNextDisabled()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };
  const { userRegister } = useAuth();
  const submitHandler = (e) => {
    e.preventDefault();
   // Ensure the form is only submitted at the final step
  if (step === 4) {
    const formData = new FormData();
    formData.append("registerUser", JSON.stringify(Data));
    formData.append("counselorFile", file);
    userRegister(formData);
    setStep(1)
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
    })
    setFile("")
    console.log(step, "stepsalskdfj asldkf ja;lsdkfj ")
  }
  };

  return (
    <form
  onSubmit={submitHandler}
  className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
>
  {renderStep()}
  <div className="flex justify-between mt-6">
    <button
      type="button"  // Explicitly set type to "button"
      className={`px-4 py-2 bg-blue-500 text-white rounded ${
        step === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
      onClick={handlePrevious}
      disabled={step === 1}
    >
      Previous
    </button>
    {step < 3 ? (
      <button
        type="button"  // Explicitly set type to "button"
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          isNextDisabled()
            ? "bg-gray-400 cursor-not-allowed"
            : "hover:bg-blue-700"
        }`}
        onClick={handleNext}
        disabled={isNextDisabled()}
      >
        Next
      </button>
    ) : (
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        type="submit" // This button is the submit button
        onClick={handleNext}
      >
        Submit
      </button>
    )}
  </div>
</form>
  );
};
