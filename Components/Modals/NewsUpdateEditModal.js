import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Oval } from "react-loader-spinner";

export default function NewsUpdateEditModal(props) {
  const cancelButtonRef = useRef(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [hint, setHint] = useState(
    "Upload JPEG, JPG, PNG, or SVG images (max 2MB, 200x200 pixels)."
  );
  const [editedImage, setEditedImage] = useState("");

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (!file) {
  //     setImagePreview(null);
  //     setErrorMessage("");
  //     props.setInsertImage("");
  //     setHint("Please select an image file.");
  //     return;
  //   }
  //   const fileSizeInMB = file?.size / (1024 * 1024);
  //   if (fileSizeInMB > 2) {
  //     setErrorMessage(
  //       "Image exceeds the 2MB limit. Please reduce its size for upload"
  //     );
  //     setImagePreview(null);
  //   } else {
  //     setErrorMessage("");
  //   }

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     props.setInsertImage(e.target.files[0]);
  //     reader.readAsDataURL(file);
  //   } else {
  //     setImagePreview(null);
  //     setErrorMessage("");
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "image/svg+xml",
    ];

    setErrorMessage("");
    setImagePreview(null);

    // Check if a file is selected
    if (!file) {
      props.setInsertImage("");
      setHint("Please select an image file.");
      return;
    }

    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
      props.setInsertImage(file);
      setErrorMessage(
        "Invalid file type. Only JPEG, JPG, WEBP, PNG, and SVG files are allowed."
      );
      return;
    }

    // Check for file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 2) {
      props.setInsertImage(file);
      setErrorMessage(
        "Image exceeds the 2MB limit. Please reduce its size for upload"
      );
      return;
    }

    // File reading for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    props.setInsertImage(file);
    reader.readAsDataURL(file);
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (errorMessage) {
                      return;
                    }
                    props.functionApi();
                  }}
                  className="max-w-md mx-auto mt-1 bg-white   "
                >
                  <h1 className="text-center font-semibold my-3">
                    {" "}
                    {props.heading}
                  </h1>
                  <div className="divide-y divide-green-400">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Title<span className="mx-1 text-red-500">*</span>
                        </label>
                        <input
                          requireds
                          id="name"
                          className="border mt-0.5 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                          type="text"
                          required
                          value={props.insertTitle}
                          onChange={(e) => {
                            props.setInsertTitle(e.target.value);
                            props.setTitleError("");
                          }}
                        />
                        {/* {props.titleerror && (
                          <p className="text-red-500 text-sm mt-0.5">
                            {props.titleerror}
                          </p>
                        )} */}
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="profileImage"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Insert Image
                          <span className="mx-1 text-red-500">*</span>
                          <input
                            id="profileImage"
                            className="border mt-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                            // onChange={(e) => {
                            //   const selectedImage = e.target.files[0];

                            //   if (selectedImage) {
                            //     props.setInsertImage(selectedImage);
                            //     props.setImageError("");
                            //   }
                            // }}
                          />
                          <div className="border flex mt-1 justify-between items-center border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-blue-500">
                            {props.insertImage ? (
                              <img
                                src={
                                  typeof props.insertImage === "string"
                                    ? props.insertImage
                                    : URL.createObjectURL(props.insertImage)
                                }
                                alt="Profile"
                                className=" rounded-md h-[30px] w-auto"
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
                        {!errorMessage && (
                          <div className="text-sm text-gray-600">{message}</div>
                        )}{" "}
                        {hint && !errorMessage && (
                          <div className="text-sm text-gray-600">{hint}</div>
                        )}{" "}
                        {/* {props.imageerror && (
                          <p className="text-red-500 text-sm mt-0.5">
                            {props.imageerror}
                          </p>
                        )} */}
                      </div>

                      <div className="flex items-center">
                        <input
                          id="liveStatus"
                          className="mr-2"
                          type="checkbox"
                          checked={props.insertisLive}
                          onChange={(e) =>
                            props.setInsertIsLive(e.target.checked)
                          }
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

                  <div className=" py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex outline-none w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#34BE82] sm:ml-3 sm:w-auto"
                    >
                      {props.loading ? (
                        <Oval
                          visible={true}
                          height="20"
                          width="20"
                          ariaLabel="Oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={["#306cce", "#72a1ed"]}
                        />
                      ) : (
                        props.btn
                      )}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex outline-none w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        props.setOpen(false);
                        props.setInsertImage("");
                        props.setInsertTitle("");
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
