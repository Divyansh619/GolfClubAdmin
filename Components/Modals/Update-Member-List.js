import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Oval } from "react-loader-spinner";
import Cookies from "js-cookie";

const UpdateMemberList = (props) => {
  const [insertName, setInsertName] = useState(props.filterListData.MemberName);
  const [insertImage, setInsertImage] = useState(
    props?.filterListData?.MemberImage || ""
  );
  const [insertMobile, setInsertMobile] = useState(
    props?.filterListData?.MemberMobile
  );
  const [insertEmail, setInsertEmail] = useState(
    props.filterListData.MemberEmail
  );
  const [insertState, setinsertState] = useState(props.filterListData.State);
  const [insertCity, setinsertCity] = useState(props.filterListData.City);
  const [insertPincode, setinsertPincode] = useState(
    props.filterListData.Pincode
  );
  const [insertAddress, setinsertAddress] = useState(
    props.filterListData.Address
  );
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [hint, setHint] = useState(
    "Upload JPEG, JPG, PNG, or SVG images (max 2MB, 200x200 pixels)."
  );

  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];
  const maxFileSize = 2 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setInsertImage(null);
      setImageError("No file selected");
      return;
    }

    if (!allowedFileTypes.includes(file.type)) {
      setInsertImage(e.target.files[0]);
      setImageError(
        "Invalid file type. Please select a JPEG, PNG, SVG, or WEBP image."
      );
      return;
    }

    if (file.size > maxFileSize) {
      setInsertImage(e.target.files[0]);
      setImageError(
        "Image exceeds the 2MB limit. Please reduce its size for upload"
      );
      return;
    }

    setInsertImage(file);
    setImageError(""); // Clear any previous error
  };

  const UpdateMemberList = () => {
    if (imageError) {
      return;
    }
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("MemberUUID", props.filterListData.MemberUUID);
    formdata.append("MembershipUUID", "");
    formdata.append(
      "MemberImage",
      typeof insertImage === "string" ? "" : insertImage
    );
    formdata.append("MembershipUUID", "");
    formdata.append("MemberID", "");
    formdata.append("MemberName", insertName);
    formdata.append("MemberMobile", insertMobile);
    formdata.append("IsMobileverified", "");
    formdata.append("MemberEmail", insertEmail);
    formdata.append("State", insertState);
    formdata.append("City", insertCity);
    formdata.append("Pincode", insertPincode);
    formdata.append("Address", insertAddress);
    formdata.append("LoginToken", "");
    formdata.append("UpdatedBy", Cookies.get("email"));
    formdata.append("IsLive", 1);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/MemberProfileupdate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("resul-lis", result)
        if (result.status_code === 200 && result.status === "Success" ) {
          props.setOpen(false);
          // props.setUpdateSuccesss(true);
          props.setOpenSuccess(true)
          props.setMessage("Member details updated successfully!!");
          // props.setMessage("Something went wrong. Please contact support!!");
          props.setSuccess(true);
          props.memberListApi(true);
        } else {
          // console.log("Error");
          props.setOpenSuccess(true)
           props.setMessage("Something went wrong. Please contact support!!");
           props.setSuccess(false);
          //  props.memberListApi(true);
        }
      })
      .catch((error) =>{ 
        console.log("error", error)
        props.setOpenSuccess(true)
        props.setMessage("Something went wrong. Please contact support!!");
        props.setSuccess(false);
        // props.memberListApi(true)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
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
                      Update Member List
                    </h1>
                    <div className="divide-y divide-green-400">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Name
                          </label>
                          <input
                            id="name"
                            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={insertName}
                            onChange={(e) => setInsertName(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="mobile"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Mobile
                          </label>
                          <input
                            id="mobile"
                            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={insertMobile}
                            onChange={(e) => setInsertMobile(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="email"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                            type="email"
                            value={insertEmail}
                            onChange={(e) => setInsertEmail(e.target.value)}
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
                              className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                              type="file"
                              hidden
                              accept="image/jpeg, image/png, image/svg+xml, image/webp"
                              onChange={handleImageChange}
                            />
                            <div className="border mt-1 flex justify-between items-center border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500">
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

                              <ArrowUpTrayIcon className="h-4 w-4  right-0 bottom-0  text-blue-500 cursor-pointer" />
                            </div>
                          </label>
                          {hint && !imageError && (
                            <p className="text-gray-500 text-sm mt-1">{hint}</p>
                          )}
                          {imageError && (
                            <p className="text-red-500 text-sm mt-1">
                              {imageError}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="state"
                            className="text-black text-sm font-medium mb-1"
                          >
                            State
                          </label>
                          <input
                            id="state"
                            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={insertState}
                            onChange={(e) => setinsertState(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="city"
                            className="text-black text-sm font-medium mb-1"
                          >
                            City
                          </label>
                          <input
                            id="city"
                            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={insertCity}
                            onChange={(e) => setinsertCity(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="pincode"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Pincode
                          </label>
                          <input
                            id="pincode"
                            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={insertPincode}
                            onChange={(e) => setinsertPincode(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="address"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Address
                          </label>
                          <input
                            id="address"
                            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={insertAddress}
                            onChange={(e) => setinsertAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="  py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex outline-none  w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#34BE82] sm:ml-3 sm:w-auto"
                      onClick={() => UpdateMemberList()}
                    >
                      {loading ? (
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
    </div>
  );
};

export default UpdateMemberList;
