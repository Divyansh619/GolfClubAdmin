import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function AddOurTeamModal(props) {
  // const [open, setOpen] = useState(true)
  const [editedName, setEditedName] = useState("");
  const [editedPosition, setEditedPosition] = useState("");
  const [isLive, setIsLive] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [hint, setHint] = useState(
    "Upload JPEG, JPG, PNG, or SVG images (max 2MB, 200x200 pixels)."
  );
  const cancelButtonRef = useRef(null);
  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    const cleanedMobile = inputMobile.replace(/\D/g, "").slice(0, 10);
    setMobile(cleanedMobile);
  };

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
  //     setEditedImage("");
  //     setHint("Please select an image file.");
  //     return;
  //   }

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     setEditedImage(e.target.files[0]);
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

    setImagePreview(null);
    setErrorMessage("");

    // Check if a file is selected
    if (!file) {
      setEditedImage("");
      setHint("Please select an image file.");
      return;
    }

    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
      setEditedImage(e.target.files[0]);
      setErrorMessage(
        "Invalid file type. Only JPEG, JPG, WEBP, PNG, and SVG files are allowed."
      );
      return;
    }

    // Check for file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 2) {
      setEditedImage(e.target.files[0]);
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
    setEditedImage(file);
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
          <div className="fixed inset-0   bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (errorMessage) {
              return;
            }
            props.AddStaff(
              editedName,
              mobile,
              email,
              editedImage,
              editedPosition,
              isLive
            );
          }}
          className="fixed inset-0 z-10 w-screen overflow-y-auto"
        >
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  p-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="max-w-md mx-auto mt-1 bg-white   ">
                  <h1 className="text-center font-semibold my-3">
                    {" "}
                    Add New {props.heading}
                  </h1>
                  <div className="divide-y divide-green-400">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Name<span className="text-red-500 mx-1">*</span>
                        </label>
                        <input
                          id="name"
                          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                          type="text"
                          required
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="mobile"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Phone<span className="text-red-500 mx-1">*</span>
                        </label>
                        <input
                          id="mobile"
                          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                          type="text"
                          required
                          value={mobile}
                          onChange={handleMobileChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Email<span className="text-red-500 mx-1">*</span>
                        </label>
                        <input
                          id="email"
                          className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="tabs"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Position
                        </label>
                        <select
                          id="tabs"
                          name="tabs"
                          value={editedPosition}
                          onChange={(e) => setEditedPosition(e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-blue-500"
                        >
                          <option value={""}>{"Select Position"}</option>
                          {props.managingSection.map((item, index) => {
                            return (
                              <option value={item.StaffPosition} key={index}>
                                {item.StaffPosition}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="profileImage"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Profile Image
                          <input
                            id="profileImage"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          <div className="border flex justify-between items-center border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-blue-500">
                            {editedImage ? (
                              <img
                                src={
                                  typeof editedImage === "string"
                                    ? editedImage
                                    : URL.createObjectURL(editedImage)
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
                      </div>

                      <div className="flex items-center">
                        <input
                          id="liveStatus"
                          className="mr-2"
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
                    {props.loading === "insert" ? (
                      <div className="flex item-center  ">
                        {" "}
                        <svg
                          aria-hidden="true"
                          role="status"
                          class="inline w-4 h-4 me-3 mt-0.5 text-gray-200 animate-spin dark:text-gray-600"
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
                      "Add"
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
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
}
