import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import SuccessMessage from "./SuccessMessage";
import YearComboBox from "./YearComboBox";

export default function UpdateCaptainModal(props) {
  // const [open, setOpen] = useState(true)
  const [editedName, setEditedName] = useState(props.filterListData.Name);
  const [startYear, setStartYear] = useState(props.filterListData.StartDate);
  const [endYear, setEndYear] = useState(props.filterListData.EndDate);
  const [isLive, setIsLive] = useState(
    props.filterListData.IsLive === "1" ? true : false
  );
  const [editedPosition, setEditedPosition] = useState(
    props.filterListData.Position
  );
  const [editedImage, setEditedImage] = useState(
    props.filterListData.Image || ""
  );
  const [email, setEmail] = useState(props.filterListData.Email || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const cancelButtonRef = useRef(null);
  const [hint, setHint] = useState(
    "Upload JPEG, JPG, PNG, or SVG images (max 2MB, 200x200 pixels)."
  );

  const [otherPosition, setOtherPosition] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [managingSection, setManagingSection] = useState([]);

  const years = [];
  const currentYear = new Date().getFullYear();

  // Generate an array of years from 1980 to 2030
  for (let year = 1980; year <= 2050; year++) {
    years.push(year);
  }

  useEffect(() => {
    getPosition();
  }, []);

  const handleStartYearChange = (value) => {
    setStartYear(value);
  };

  const handleEndYearChange = (value) => {
    setEndYear(value);
  };

  const handlePositionChange = (e) => {
    const selectedValue = e.target.value;
    setEditedPosition(selectedValue);
    if (selectedValue === "Other") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  };

  const handleOtherInputChange = (e) => {
    setOtherPosition(e.target.value);
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
  //     setEditedImage(props.filterListData.Image);
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

  // const managingSection = [
  //   {
  //     name: "President",
  //   },
  //   { name: "Secretary" },
  //   { name: "Captain" },
  //   { name: "Hon. Jt. Secretary Cum Treasurer" },
  //   { name: "Member Managing Committee" },
  // ];

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
      setEditedImage(props.filterListData.Image || "");
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

  const UpdateManagingCommitee = () => {
    if (errorMessage) {
      return;
    }

    setLoading("insert");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("Name", editedName);
    formdata.append(
      "ManagingCommitteeUUID",
      props.filterListData.ManagingCommitteeUUID
    );
    formdata.append("SrNo", "");
    formdata.append("Email", email);
    formdata.append(
      "Image",
      typeof editedImage === "string" ? "" : editedImage
    );

    if (showOtherInput) {
      formdata.append("Position", otherPosition);
    } else {
      formdata.append("Position", editedPosition);
    }
    formdata.append("ManagingCommitteeMessage ", "");
    formdata.append("About", "");
    formdata.append("StartDate", startYear);
    formdata.append("EndDate", endYear);
    formdata.append("IsLive ", isLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/ManagingCommitteeUpdate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          //   setBannerListApiData(result.data);
          setMessage(`${props.heading} member updated successfully!!`);
          setSuccess(true);
          setOpen(true);
          // props.captainList()
          // props.secretaryList()
          props.managingCommiteeList();
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setMessage("Something went wrong. Please contact support!!");
        setSuccess(false);
        setOpen(true);
      })
      .finally(() => {
        setLoading("");
      });
  };

  const getPosition = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = "";
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/ManagingCommitteeDropDownByPosition",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setManagingSection(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const managingCommiteeList = async (page) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AdminManagingCommitteeList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setManagingCommiteeData(result.data);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {open ? (
        <SuccessMessage
          open={open}
          setOpen={props.setOpen}
          message={message}
          success={success}
        />
      ) : (
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
              <div className="sm:flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-4   text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        UpdateManagingCommitee();
                      }}
                      className="mb-4"
                    >
                      <div className="max-w-md mx-auto mt-1 bg-white   ">
                        <h1 className="text-center font-semibold my-3">
                          Update {props.heading}
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
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#90A955]"
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
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
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            {/* <div className="flex flex-col">
                          <label htmlFor="tabs" className="text-black text-sm font-medium mb-1">
                            Position
                          </label>

                          <select
                            id="tabs"
                            name="tabs"
                            value={editedPosition}
                            onChange={(e) => setEditedPosition(e.target.value)}
                            className="border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-blue-500"
                          >
                            {props.managingSection && props.managingSection.map((item, index) => {
                              return <option value={item.Position} key={index}>
                                {item.Position}
                              </option>
                            })}
                          </select>


                        </div> */}

                            <div className="flex flex-col">
                              <label
                                htmlFor="email"
                                className="text-black text-sm font-medium mb-1"
                              >
                                Position
                              </label>
                              <select
                                id="tabs"
                                name="tabs"
                                value={editedPosition}
                                onChange={handlePositionChange}
                                className="border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-blue-500"
                              >
                                {managingSection.map((item, index) => (
                                  <option value={item.Position} key={index}>
                                    {item.Position}
                                  </option>
                                ))}
                                {/* {managingSection.map((item, index) => (
                                  <option value={item.name} key={index}>
                                    {item.name}
                                  </option>
                                ))} */}
                                <option>Other</option>
                              </select>

                              {showOtherInput && (
                                <input
                                  type="text"
                                  placeholder="Enter Other Position"
                                  value={otherPosition}
                                  onChange={handleOtherInputChange}
                                  className="border border-gray-300 rounded-md px-2 py-2 mt-2 focus:outline-none focus:border-blue-500"
                                />
                              )}
                            </div>

                            {/* <div className="flex flex-col">
                              <label
                                htmlFor="staffPosition"
                                className="text-black text-sm font-medium mb-1"
                              >
                                Start Year
                              </label>
                              <input
                                id="startYear"
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#90A955]"
                                type="text"
                                value={editedStartYear}
                                onChange={(e) =>
                                  setEditedStartYear(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="staffPosition"
                                className="text-black text-sm font-medium mb-1"
                              >
                                End Year
                              </label>
                              <input
                                id="endYear"
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#90A955]"
                                type="text"
                                value={editedEndYear}
                                onChange={(e) =>
                                  setEditedEndYear(e.target.value)
                                }
                              />
                            </div> */}

                            {/* <div className="flex flex-col">
  <label htmlFor="startYear" className="text-black text-sm font-medium mb-1">
    Start Year
  </label>
  <input
    list="start-year-options"
    id="startYear"
    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#90A955]"
    type="text"
    value={editedStartYear}
    onChange={(e) => setEditedStartYear(e.target.value)}
  />
  <datalist id="start-year-options">
    {years.map((year) => (
      <option key={year} value={year} />
    ))}
  </datalist>
</div>

<div className="flex flex-col">
  <label htmlFor="endYear" className="text-black mt-3 text-sm font-medium mb-1">
    End Year
  </label>
  <input
    list="end-year-options"
    id="endYear"
    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#90A955]"
    type="text"
    value={editedEndYear}
    onChange={(e) => setEditedEndYear(e.target.value)}
  />
  <datalist id="end-year-options">
    {years.map((year) => (
      <option key={year} value={year} />
    ))}
  </datalist>
</div> */}

                            <div className="flex flex-col">
                              <YearComboBox
                                label="Start Year"
                                selectedYear={startYear}
                                setSelectedYear={setStartYear}
                                onInputChange={handleStartYearChange}
                              />
                            </div>

                            <div className="flex flex-col">
                              <YearComboBox
                                label="End Year"
                                selectedYear={endYear}
                                setSelectedYear={setEndYear}
                                onInputChange={handleEndYearChange}
                              />
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
                                <div className="text-red-600">
                                  {errorMessage}
                                </div>
                              )}{" "}
                              {!errorMessage && (
                                <div className="text-sm text-gray-600">
                                  {message}
                                </div>
                              )}{" "}
                              {hint && !errorMessage && (
                                <div className="text-sm text-gray-600">
                                  {hint}
                                </div>
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
                          className="inline-flex outline-none w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm   sm:ml-3 sm:w-auto"
                        >
                          {loading === "insert" ? (
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
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
