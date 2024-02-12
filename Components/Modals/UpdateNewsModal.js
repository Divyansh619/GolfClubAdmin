import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Oval } from "react-loader-spinner";

export default function UpdateNewsModal(props) {
  const [insertTitle, setInsertTitle] = useState(props.filterListData.Title);
  const [insertImage, setInsertImage] = useState(
    props?.filterListData?.ImagePdfUrl || ""
  );
  const [insertisLive, setInsertIsLive] = useState(
    props?.filterListData?.IsLive
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [hint, setHint] = useState(
    "Upload JPEG, JPG, PNG, or SVG images (max 2MB, 200x200 pixels)."
  );

  const cancelButtonRef = useRef(null);

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
  //     setInsertImage(props?.filterListData?.ImagePdfUrl);
  //     return;
  //   }

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     setInsertImage(e.target.files[0]);
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
      setInsertImage(props?.filterListData?.ImagePdfUrl || "");
      setHint("Please select an image file.");
      return;
    }

    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
      setImagePreview(null);
      setInsertImage(e.target.files[0]);
      setErrorMessage(
        "Invalid file type. Only JPEG, JPG, WEBP, PNG, and SVG files are allowed."
      );
      return;
    }

    // Check for file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 2) {
      setInsertImage(e.target.files[0]);
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
    setInsertImage(file);
    reader.readAsDataURL(file);
  };

  const UpdateNews = () => {
    if (errorMessage) {
      return;
    }
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("SrNo", 1);
    formdata.append("Title", insertTitle);
    formdata.append(
      "ImagePdfUrl",
      typeof insertImage === "string" ? "" : insertImage
    );
    formdata.append("UpdateUUID", props.filterListData.UpdateUUID);
    formdata.append("IsLive", insertisLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/LatestUpdatesEdit",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          props.setopenmodal(true);
          props.setMessage("News updated successfully!!");
          props.setSuccess(true);
          props.AdminLatestUpdatesList();
          // props.setUpdateSuccesss(true);
        } else {
          props.setopenmodal(true);
          props. setMessage("Something went wrong. Please contact support!!");
          props.setSuccess(false);
        }
      })
      .catch((error) => {
        console.log("error", error)
        props.setopenmodal(true);
          props. setMessage("Something went wrong. Please contact support!!");
          props.setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
      });
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
                <div className="max-w-md mx-auto mt-1 bg-white   ">
                  <h1 className="text-center font-semibold my-3">
                    {" "}
                    Update News
                  </h1>
                  <div className="divide-y divide-green-400">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Title
                        </label>
                        <input
                          id="name"
                          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                          type="text"
                          value={insertTitle}
                          onChange={(e) => setInsertTitle(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="profileImage"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Image
                          <input
                            id="profileImage"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                            // onChange={(e) => {
                            //   setInsertImage(e.target.files[0]);
                            // }}
                          />
                          <div className="border mt-1 flex justify-between items-center border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-blue-500">
                            {insertImage ? (
                              <img
                                src={
                                  typeof insertImage === "string"
                                    ? insertImage
                                    : URL.createObjectURL(insertImage)
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
                          checked={insertisLive}
                          onChange={(e) => setInsertIsLive(e.target.checked)}
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
                <div className="  py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex outline-none  w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#34BE82] sm:ml-3 sm:w-auto"
                    onClick={() => UpdateNews()}
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
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
