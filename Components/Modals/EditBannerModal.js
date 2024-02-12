import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";

export default function EditBannerModal(props) {
  const [dropDownList, setDropDownList] = useState([]);
  const cancelButtonRef = useRef(null);
  const [carouselDesktopImage, setCarouselDesktopImage] = useState(
    props.getId.BannerImageDesktop
  );
  const [sno, setSno] = useState(props.getId.SNo);
  const [carouselMobileImage, setCarouselMobileImage] = useState(
    props.getId.BannerImageMobile || ""
  );
  const [carouselSection, setCarouselSection] = useState(
    props.getId.BannerSection || ""
  );
  const [isLive, setIsLive] = useState(
    props.getId.IsLive === "1" ? true : false
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMobileMsg, setErrorMobileMsg] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [hint, setHint] = useState(
    "Upload JPEG, JPG, PNG, or SVG images (max 2MB, 200x200 pixels)."
  );
  const [desktopImageError, setDesktopImageError] = useState("");
  const [mobileImageError, setMobileImageError] = useState("");

  useEffect(() => {
    dropdownBanner();
  }, []);

  const dropdownBanner = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/BannerDropdown",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setDropDownList(result.Data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const updateBanner = () => {
    setLoading("update");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    var formdata = new FormData();
    formdata.append("SNo", sno);
    formdata.append("BannerUUID", props.getId.BannerUUID);
    formdata.append("BannerSection", carouselSection);
    formdata.append(
      "BannerImageMobile",
      typeof carouselMobileImage === "string" ? "" : carouselMobileImage
    );
    formdata.append("BannerImageAltTag", "");
    formdata.append(
      "BannerImageDesktop",
      typeof carouselDesktopImage === "string" ? "" : carouselDesktopImage
    );
    formdata.append("BannerClickURL", "");
    formdata.append("UpdatedBy", Cookies.get("email"));
    formdata.append("IsLive", isLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/BannerUpdate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSno("");
          setCarouselSection("");
          props.setMessage("Banner updated successfully!!");
          props.setSuccess(true);
          props.setOpenSuccessMessage(true);
          props.BannerListApi();
          props.setOpen(false);
        } else {
          props.setMessage("Something went wrong. Please contact support!!");
          props.setSuccess(false);
          props.setOpenSuccessMessage(true);
        }
      })
      .catch((error) => {
        props.setMessage("Something went wrong. Please contact support!!");
        props.setSuccess(false);
        props.setOpenSuccessMessage(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/jpg",
  ];

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   const fileSizeInMB = file?.size / (1024 * 1024);

  //   if (fileSizeInMB > 2) {
  //     setErrorMessage(
  //       "Image exceeds the 2MB limit. Please reduce its size for upload"
  //     );
  //     setImagePreview(null);
  //   } else {
  //     setErrorMessage("");
  //   }

  //   if (!file) {
  //     setImagePreview(null);
  //     setCarouselDesktopImage("");
  //     // setHint("Please select an image file.");
  //     return;
  //   }

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     setDesktopImageError("");
  //     setCarouselDesktopImage(e.target.files[0]);
  //     reader.readAsDataURL(file);
  //   } else {
  //     setImagePreview(null);
  //     setErrorMessage("");
  //   }
  // };

  // const handleMobileImageChange = (e) => {
  //   const file = e.target.files[0];

  //   const fileSizeInMB = file?.size / (1024 * 1024);

  //   if (fileSizeInMB > 2) {
  //     setErrorMobileMsg(
  //       "Image exceeds the 2MB limit. Please reduce its size for upload"
  //     );
  //     setImagePreview(null);
  //   } else {
  //     setErrorMobileMsg("");
  //   }

  //   if (!file) {
  //     setImagePreview(null);
  //     setCarouselMobileImage("");
  //     // setHint("Please select an image file.");
  //     return;
  //   }

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     setMobileImageError("");
  //     setCarouselMobileImage(e.target.files[0]);
  //     reader.readAsDataURL(file);
  //   } else {
  //     setImagePreview(null);
  //     setErrorMessage("");
  //   }
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   let hasError = false;

  //   if (!props.carouselDesktopImage) {
  //     setDesktopImageError("Please upload a desktop image.");
  //     hasError = true;
  //   } else {
  //     setDesktopImageError("");
  //   }

  //   if (!props.carouselMobileImage) {
  //     setMobileImageError("Please upload a mobile image.");
  //     hasError = true;
  //   } else {
  //     setMobileImageError("");
  //   }

  //   if (!hasError) {
  //     if (errorMessage && errorMobileMsg) {
  //       return;
  //     }
  //     props.functionApi(); // Call the original submit function
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImagePreview(null);
      setCarouselDesktopImage("");
      setErrorMessage("No file selected. Please select an image file.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(
        "Invalid file type. Only JPEG, JPG, PNG, and SVG files are allowed."
      );
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 2) {
      setErrorMessage(
        "Image exceeds the 2MB limit. Please reduce its size for upload"
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setCarouselDesktopImage(file);
      setErrorMessage("");
    };
    reader.readAsDataURL(file);
  };

  const handleMobileImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImagePreview(null);
      setCarouselMobileImage("");
      setErrorMobileMsg("No file selected. Please select an image file.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setCarouselMobileImage(e.target.files[0]);
      setErrorMobileMsg(
        "Invalid file type. Only JPEG, JPG, PNG, and SVG files are allowed."
      );
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 2) {
      setCarouselMobileImage(e.target.files[0]);
      setErrorMobileMsg(
        "Image exceeds the 2MB limit. Please reduce its size for upload"
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setCarouselMobileImage(file);
      setErrorMobileMsg("");
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const hasFileError = errorMessage || errorMobileMsg;
    const hasMissingImageError = !carouselDesktopImage || !carouselMobileImage;

    if (hasFileError) {
      if (!carouselDesktopImage) {
        setDesktopImageError("Please upload a desktop image.");
      }

      if (!carouselMobileImage) {
        setMobileImageError("Please upload a mobile image.");
      }

      return;
    }

    if (hasMissingImageError) {
      setDesktopImageError(
        !carouselDesktopImage ? "Please upload a desktop image." : ""
      );
      setMobileImageError(
        !carouselMobileImage ? "Please upload a mobile image." : ""
      );

      return;
    }
    updateBanner();
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <form
            onSubmit={handleFormSubmit}
            className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden  p-4 rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-lg">
                <div className="max-w-md mx-auto mt-1 bg-white   ">
                  <h1 className="text-center font-semibold my-3">
                    Update Banner
                  </h1>
                  <div className="divide-y divide-green-400">
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Carousel Section
                        </label>

                        <select
                          value={carouselSection}
                          onChange={(e) => setCarouselSection(e.target.value)}
                          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Section</option>
                          {dropDownList.map((item, index) => (
                            <option key={index} value={item.BannerSection}>
                              {item.BannerSection}
                            </option>
                          ))}
                        </select>
                      </div>

                      {carouselSection === "Home" && (
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Position
                          </label>
                          <input
                            id="name"
                            className="border  border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            type="text"
                            // required
                            value={sno}
                            onChange={(e) => setSno(e.target.value)}
                          />
                        </div>
                      )}

                      <div className="flex flex-col">
                        <label
                          htmlFor="desktopImage"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Desktop Image
                          <div className="mt-1" />
                          <input
                            id="desktopImage"
                            className="border mt-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                            // onChange={(e) => {
                            //   setCarouselDesktopImage(e.target.files[0]);
                            // }}
                          />
                          <div className="border  flex justify-between items-center border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-blue-500">
                            {carouselDesktopImage ? (
                              <img
                                src={
                                  typeof carouselDesktopImage === "string"
                                    ? carouselDesktopImage
                                    : URL.createObjectURL(carouselDesktopImage)
                                }
                                alt="Icon"
                                className=" rounded-md h-[25px] w-auto"
                              />
                            ) : (
                              <p>No image selected</p>
                            )}
                            <ArrowUpTrayIcon className="h-6 w-6  right-0 bottom-0  text-blue-500 cursor-pointer" />
                          </div>
                        </label>
                        {errorMessage && (
                          <div className="text-red-600">{errorMessage}</div>
                        )}{" "}
                        {hint && !errorMessage && (
                          <div className="text-sm text-gray-600">{hint}</div>
                        )}{" "}
                        {/* #pixel */}
                        {/* <div className="text-sm  text-gray-600">
                          {carouselSection === "Home" ? (
                            <div>The Size of Image Should be "1600 x 600"</div>
                          ) : (
                            <div>The Size of Image Should be "1600 x 400"</div>
                          )}
                        </div> */}
                      </div>
                      {desktopImageError && (
                        <p className="text-red-500 text-sm mt-2">
                          {desktopImageError}
                        </p>
                      )}

                      <div className="flex flex-col">
                        <label
                          htmlFor="mobileImage"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Mobile Image
                          <div className="mt-1" />
                          <input
                            id="mobileImage"
                            className="border mt-1 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleMobileImageChange}
                            // onChange={(e) => {
                            //   setCarouselMobileImage(e.target.files[0]);
                            // }}
                          />
                          <div className="border flex justify-between items-center border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-blue-500">
                            {carouselMobileImage ? (
                              <img
                                src={
                                  typeof carouselMobileImage === "string"
                                    ? carouselMobileImage
                                    : URL.createObjectURL(carouselMobileImage)
                                }
                                alt="Icon"
                                className=" rounded-md h-[25px] w-auto"
                              />
                            ) : (
                              <p>No image selected</p>
                            )}
                            <ArrowUpTrayIcon className="h-6 w-6  right-0 bottom-0  text-blue-500 cursor-pointer" />
                          </div>
                        </label>
                        {errorMobileMsg && (
                          <div className="text-red-600">{errorMobileMsg}</div>
                        )}{" "}
                        {hint && !errorMobileMsg && (
                          <div className="text-sm text-gray-600">{hint}</div>
                        )}{" "}
                      </div>
                      {mobileImageError && (
                        <p className="text-red-500 text-sm mt-2">
                          {mobileImageError}
                        </p>
                      )}

                      <div className="flex items-center">
                        <input
                          id="liveStatus"
                          className="mr-1.5  p-1"
                          type="checkbox"
                          checked={isLive}
                          onChange={(e) => setIsLive(e.target.checked)}
                        />
                        <label
                          htmlFor="liveStatus"
                          className="text-black text-sm font-medium"
                        >
                          Live
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex outline-none w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#34BE82] sm:ml-3 sm:w-auto"
                  >
                    {loading ? (
                      <div className="flex item-center">
                        {" "}
                        <svg
                          aria-hidden="true"
                          role="status"
                          class="inline w-4 h-4 me-3 text-gray-200 mt-1 animate-spin dark:text-gray-600"
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
                            fill="#1C64F2"
                          />
                        </svg>{" "}
                        <span>processing...</span>
                      </div>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex outline-none w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => props.setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </form>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
