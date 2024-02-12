import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import SuccessMessage from "./SuccessMessage";

const OtpModal = ({
  email,
  onClose,
  setIsModalOtpOpen,
  isModalOtpOpen,
  open,
  setOpen,
  message,
  setMessage,
  success,
  setSuccess,
  setResetOpen,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(""),
    useRef(""),
    useRef(""),
    useRef(""),
    useRef(""),
    useRef(""),
  ];
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [OtpError, setOtpError] = useState("");
  const [resendOtpError, setResendOtpError] = useState(
    "Check your email for the OTP to set new password."
  );
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [canResendOtp, setCanResendOtp] = useState(true);
  const [timer, setTimer] = useState(120);
  const router = useRouter();

  const handleInputChange = (index, value) => {
    setSubmitError("");
    setOtpError("");
    // setResendOtpError("");
    // setSubmitError("");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Handle backspace key
    if (value === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (index < inputRefs.length - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move focus to the previous input field on backspace
    if (e.key === "Backspace" && index > 0) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = "";
        return newOtp;
      });

      // Focus on the previous input field
      setTimeout(() => {
        inputRefs[index - 1].current.focus();
      }, 0);
    }
  };

  const handleResendOtp = () => {
    if (canResendOtp) {
      setSubmitError("")
      setCanResendOtp(false);
      setTimer(120);
      ResendOtp();
    }
  };

  const resetPassword = () => {
    setLoading("reset");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("Email", email);
    // formdata.append("Otp", enteredOtp);
    formdata.append("Password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/VerifyEmailPassword",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log("result",result)
        if (
          result.status_code === 200 &&
          result.status === "Success" &&
          result.message === "New Password Set Successfully"
        ) {
          // setIsOtpVerified(true)
          setSuccess(true);
          setMessage(
            "New password set successfully. Please login with new password!!"
          );
          setOpen(true);
          // refreshOTP();
          setIsModalOtpOpen(false);
          setResetOpen(false);
        } else {
          setSuccess(false);
          setOpen(true);
          setMessage("Something went wrong to setup new password. Please contact support!!");
          setIsModalOtpOpen(false);
          // console.log("Something went wrong, Please contact support!!");
        }
      })
      .catch((error) => {
        setMessage("Something went wrong, Please contact support!!");
        setSubmitError("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if OTP is submitted and correct
    if (isOtpSubmitted) {
      // Validate password fields
      if (password !== confirmPassword) {
        setSubmitError("Password and confirm password do not match.");
      } else {
        // Reset password logic
        resetPassword();
      }
    } else {
      // Verify OTP
      if (otp.some((value) => value === "")) {
        setOtpError("Please enter a valid OTP.");
      } else {
        setSubmitError(null)
        setOtpError(null)
        submitOTP();
      }
    }
  };

  const ResendOtp = () => {
    setResendOtpError("");
    setLoading("resend");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("Email", email);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/LGCAdminUserForgetPassword",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setResendOtpError(`OTP Sent to registered email.`);
          setIsOtpVerified(false)
          setOtp(["", "", "", "", "", ""])
          setConfirmPassword("")
          setPassword("")
          setSuccess(true);
          setMessage("OTP Sent to registered email.");
          setOpen(true);
        } else {
          setSuccess(true);
          setMessage("Something went wrong, Please contact support!!");
          setOpen(true);
          // setResendOtpError("Something went wrong, Please contact support!!");
        }
      })
      .catch((error) => {
        setResendOtpError("Something went wrong, Please contact support!!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitOTP = () => {
    setLoading("verify");
    const enteredOtp = otp.join("");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("Email", email);
    formdata.append("Otp", enteredOtp);
    // formdata.append("Password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/VerifyEmailOTP",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result",result)
        if (
          result.status_code === 200 &&
          result.status === "Success" &&
          result.message === "OTP Matched Successfully"
        ) {
          setResendOtpError("OTP verified successfully!!")
          setIsOtpVerified(true)
          setIsOtpSubmitted(true);
          // setSuccess(true);
          // setMessage(
          //   "New password set successfully. Please login with new password!!"
          // );
          // setOpen(true);
          refreshOTP();
          // setIsModalOtpOpen(false);
          // setResetOpen(false);
        } else if (
          result.status_code === 200 &&
          result.status === "Success" &&
          result.message === "OTP Verification Failed"
        ) {
          setOtpError("User not found. Please enter correct email!!");
        } else if (
          result.status_code === 200 &&
          result.status === "Success" &&
          result.message === "Your OTP has been Expired"
        ) {
          setOtpError("OTP has been expired. Please resend the OTP");
        } else if (
          result.status_code === 200 &&
          result.status === "Success" &&
          result.message === "Your OTP is incorrect"
        ) {
          setOtpError("Incorrect OTP. Please enter correct OTP");
        } else {
          setSuccess(false);
          setOpen(true);
          setMessage("Something went wrong, Please contact support!!");
          setIsModalOtpOpen(false);
          // console.log("Something went wrong, Please contact support!!");
        }
      })
      .catch((error) => {
        setMessage("Something went wrong, Please contact support!!");
        setSubmitError("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const refreshOTP = () => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("Email", email);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/RefreshEmailOTP",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log("result-refresh", result)
        if (result.status_code === 200 && result.status === "Success") {
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setSubmitError("Password and confirm password do not match.");
    } else {
      setSubmitError("");
    }
  };

  useEffect(() => {
    let interval;
    if (!canResendOtp) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [canResendOtp]);


  useEffect(() => {
    if (timer <= 0) {
      setCanResendOtp(true);
      setTimer(0);
      clearInterval(timer);
    }
  }, [timer]);

  // Focus on the first input when the modal is opened
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  return (
    <>
      <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
      />
      <div className="fixed inset-0 overflow-y-auto bg-opacity-50 bg-black backdrop-filter backdrop-blur-sm">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white z-50 p-8 rounded shadow-md w-full sm:w-96">
            <div className="flex justify-end ">
              <button
                onClick={onClose}
                className="text-gray-600 -mt-4 -mr-4 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold">Set New Password</h2>
              <p className="text-gray-500 text-sm">{resendOtpError}</p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    placeholder="0"
                    value={digit}
                    onChange={(e) => {handleInputChange(index, e.target.value)}}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength="1"
                    disabled={isOtpVerified}
                    className="w-1/4 p-2 border border-gray-300 rounded text-center focus:outline-none focus:border-green-500 focus:bg-white caret-green-500"
                  />
                ))}
            </div>
            {OtpError && <div className="text-red-700 pb-1">{OtpError}</div>}
            {!isOtpVerified && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isOtpSubmitted}
                className="w-full mb-4  bg-[#34BE82] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out"
              >
                Verify OTP
              </button>
            )}

            <div className={`${isOtpVerified ? "" : "opacity-50 pointer-events-none"}`}>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="my-2.5 mb-5 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setSubmitError("");
                      setOtpError("");
                    }}
                    placeholder="Enter your password"
                    className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-0 right-0 p-2 text-sm m-1 text-gray-500 cursor-pointer focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                {/* <div className="my-2.5 mb-5 relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    value={confirmPassword}
                    required
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setSubmitError("");
                      setOtpError("");
                    }}
                    placeholder="Enter your password"
                    className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-0 right-0 p-2 text-sm m-1 text-gray-500 cursor-pointer focus:outline-none"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                  {submitError && (
                    <div className="text-red-700 mt-1">{submitError}</div>
                  )}
                </div> */}
                <div className="my-2.5 mb-5 relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmpassword"
                      value={confirmPassword}
                      required
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setSubmitError("");
                        setOtpError("");
                      }}
                      onBlur={handleConfirmPasswordBlur}
                      placeholder="Enter your password again"
                      className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-0 right-0 p-2 text-sm m-1 text-gray-500 cursor-pointer focus:outline-none"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                    {submitError && (
                      <div className="text-red-700 mt-1">{submitError}</div>
                    )}
                  </div>
              </div>
              {/* <div className="flex space-x-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    placeholder="0"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength="1"
                    className="w-1/4 p-2 border border-gray-300 rounded text-center focus:outline-none focus:border-green-500 focus:bg-white caret-green-500"
                  />
                ))}
              </div> */}
              
              </div>
             {isOtpVerified &&  <button
                  type="submit"
                  className="w-full bg-[#34BE82] hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out"
                >
                {loading === "Login" ? (
                  <div
                    role="status"
                    className="flex justify-center gap-2 items-center"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-[#fcfbdb]"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="">Processing...</span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>}
            </form>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleResendOtp}
                disabled={!canResendOtp}
                className="text-[#34BE82] hover:underline"
              >
                {loading === "resend" ? (
                  <div
                    role="status"
                    className="flex justify-center gap-2 items-center"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-[#EF7167]"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="">Processing...</span>
                  </div>
                ) : (
                  canResendOtp ? "Resend OTP" : `Resend in ${timer}s`
                )}
              </button>
              {/* <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Close
            </button> */}
            </div>
            {/* {<div className="text-red-700">{message}</div>} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpModal;
