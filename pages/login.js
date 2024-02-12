import ResetPassword from "@/Components/Modals/ResetPassword";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const LoginAPi = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      Password: password,
      Email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/LGCAdminUserLogin",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (
          (result.status_code === 200 && result.status === "Success",
          result.message === "Invalid User")
        ) {
          setMessage(
            "User email or password is incorrect, Please enter valid credentials."
          );
          setSuccess(false);
          setOpen(true);
        } else if (result.status_code === 200 && result.status === "Success") {
          Cookies.set("email", email);
          Cookies.set("loggedIn", true);
          router.push("/");
        } else {
          setMessage("Something went wrong.Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      })
      .catch((error) => {
        setMessage("Something went wrong.Please contact support!!");
        setSuccess(false);
        setOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateForm = () => {
    let isValid = true;
    setLoginError("");
    // Validate email
    if (!email.trim()) {
      setEmailError("Please enter your email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Please enter your password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      LoginAPi();
    }
  };

  const handleOpenResetModal = () => {
    setIsResetModalOpen(true);
  };

  const handleCloseResetModal = () => {
    setIsResetModalOpen(false);
  };

  return (
    <>
      {!isResetModalOpen && (
        <section className="bg-white">
          <SuccessMessage
            open={open}
            setOpen={setOpen}
            message={message}
            success={success}
          />
          <div className="grid grid-cols-1">
            <div className=" items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
              <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                  Sign In
                </h2>

                <form onSubmit={handleSubmit} className="mt-8">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-base font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="none"
                          placeholder="Enter email to get started"
                          className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                        {emailError && (
                          <p className="text-red-500">{emailError}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="text-base font-medium text-gray-900"
                        >
                          Password
                        </label>
                      </div>
                      <div className="mt-2.5 relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                        {passwordError && (
                          <p className="text-red-500">{passwordError}</p>
                        )}
                      </div>
                    </div>
                    {loginError && <p className="text-red-500">{loginError}</p>}
                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full px-2 py-2 text-base font-semibold text-white transition-all duration-200 bg-[#34BE82] border border-transparent rounded-md focus:outline-none hover:opacity-90 "
                      >
                        {loading ? (
                          <div className="flex items-center">
                            {" "}
                            <svg
                              aria-hidden="true"
                              role="status"
                              class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
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
                                fill="white"
                              />
                            </svg>{" "}
                            <span>Processing...</span>
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={handleOpenResetModal}
                    className="text-sm text-[#34BE82] hover:text-[#219161]"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {isResetModalOpen && (
        <ResetPassword
          resetOpen={isResetModalOpen}
          setResetOpen={setIsResetModalOpen}
          open={open}
          setOpen={setOpen}
          setMessage={setMessage}
          setSuccess={setSuccess}
          message={message}
          success={success}
        />
      )}
    </>
  );
};

export default Login;
