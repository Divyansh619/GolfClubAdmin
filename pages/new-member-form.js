import Heading from "@/Components/Heading";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import ThemeWrapper from "@/Components/ThemeWrapper";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import states from "../Json/states";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const NewMemberForm = () => {
  const [editedImage, setEditedImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [memberId, setMemberId] = useState("");
  const [memberType, setMemberType] = useState("Permanent");

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [hint, setHint] = useState(
    "Upload JPEG, JPG, PNG, or SVG images (max 2MB)."
  );

  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    const cleanedMobile = inputMobile.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(cleanedMobile);
  };
  const handlePostalChange = (e) => {
    const inputMobile = e.target.value;
    const cleanedMobile = inputMobile.replace(/\D/g, "").slice(0, 10);
    setPostalCode(cleanedMobile);
  };

  const MemberRegister = () => {
    if(errorMessage){
      setMessage(errorMessage);
      setSuccess(false);
      setOpen(true);
      return
    }

    setLoading("insert");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    var formdata = new FormData();
    formdata.append("MemberType ", memberType);
    formdata.append("MemberImage ", editedImage);
    formdata.append("Address ", streetAddress);
    formdata.append("MemberEmail ", email);
    formdata.append("MemberMobile ", phoneNumber);
    formdata.append("MemberID ", memberId);
    formdata.append("MemberName ", firstName);
    formdata.append("Pincode  ", postalCode);
    formdata.append("City  ", city);
    formdata.append("State  ", region);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/RegisterMember",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result",result)
        if (
          result.status_code === 200 &&
          result.status === "Success" &&
          result.message ===
            "Member Already Exists Please select different member"
        ) {
          setMessage(
            "Member already exists please register with diffrent phone number"
          );
          setSuccess(false);
          setOpen(true);
          // OurTeamList();
        } else if (result.status_code === 200 && result.status === "Success") {
          setMessage("Member registered successfully!!");
          setEditedImage("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNumber("");
          setMemberId("");
          setMemberType("Permanent");
          setStreetAddress("");
          setCity("");
          setRegion("");
          setPostalCode("");
          setImagePreview("");
          setErrorMessage("")
          setHint("Upload JPEG, JPG, PNG, or SVG images (max 2MB).");
          setSuccess(true);
          setOpen(true);
          // OurTeamList();
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      })
      .catch((error) => {
        setMessage("Something went wrong. Please contact support!!");
        setSuccess(false);
        setOpen(true);
      })
      .finally(() => {
        setLoading("");
      });
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

    setErrorMessage("");
    setImagePreview(null);
    setEditedImage(e.target.files[0])

    // Check if a file is selected
    if (!file) {
      setEditedImage("");
      setImagePreview(null)
      setEditedImage(e.target.files[0])
      // setHint("Please select an image file.");
      return;
    }

    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
      setImagePreview(null)
      setEditedImage(e.target.files[0])
      setErrorMessage(
        "Invalid file type. Only JPEG, JPG, WEBP, PNG, and SVG files are allowed!!"
      );
      return;
    }

    // Check for file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 2) {
      setImagePreview(null)
      setEditedImage(e.target.files[0])
      setErrorMessage(
        "Image exceeds the 2MB limit. Please reduce its size to upload!!"
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
    <ThemeWrapper menu={"Member-List"}>
      <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          MemberRegister();
        }}
      >
        <div className="space-y-4">
        <div className="sm:flex sm:mt-4 sm:items-center">
          <div className="sm:flex-auto">
            <Heading heading={"New Member Form"} />
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href={"member-list"}
              //   onClick={() => setAddClubModal(true)}
              className="block rounded-md bg-[#34BE82] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              View Member List
            </Link>
          </div>
        </div>
          <div>
            <div class=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3 sm:flex sm:items-center">
                <label class=" flex items-center gap-x-3" htmlFor="file-upload">
                  {editedImage ? (
                    <>
                      <img
                        class="h-24 w-24 rounded-full p-1 border object-fill "
                        alt=""
                        src={
                          typeof editedImage === "string"
                            ? editedImage
                            : URL.createObjectURL(editedImage)
                        }
                      />
                    </>
                  ) : (
                    <UserCircleIcon
                      class="h-24 w-24 text-gray-300 bg-white"
                      aria-hidden="true"
                    />
                  )}

                  <input
                    id="file-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                  <div
                    type="div"
                    class="rounded-md bg-white px-2.5 mr-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none hover:bg-gray-50"
                  >
                    {editedImage ? "Change" : "Upload"}
                  </div>
                </label>
                {errorMessage && (
                  <div className="text-xs text-red-600">{errorMessage}</div>
                )}{" "}
                {hint && !errorMessage && (
                  <div className="text-xs text-gray-600">{hint}</div>
                )}{" "}
                {/* {editedImage?  <XMarkIcon  onClick={()=>setEditedImage("")} className="h-5 w-5 -mt-[70px] -ml-[118px] bg-white hover:bg-red-500 hover:text-white hover:cursor-pointer border border-red-500 text-red-500 rounded-md" /> :<></>} */}
                {/* {editedImage?   <div
                  onClick={()=>setEditedImage("")}
                    type="div"
                    class="rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none hover:bg-gray-50"
                  >
                   {"Remove"}
                  </div>:<></>} */}
              </div>
            </div>
          </div>
          <div className="pb-6">
            <div className=" grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-3 text-gray-900"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm "
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-3 text-gray-900"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    // onInvalid={(event) => {
                    //   event.target.setCustomValidity('Please enter valid email address.');
                    // }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm "
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium leading-3 text-gray-900"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    required
                    maxLength={10}
                    minLength={10}
                    value={phoneNumber}
                    onChange={handleMobileChange}
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm "
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="memberId"
                  className="block text-sm font-medium leading-3 text-gray-900"
                >
                  Member ID <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="memberId"
                    id="memberId"
                    required
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm "
                  />
                </div>
              </div>
              {/* <div className="sm:col-span-3">
                              <label
                                htmlFor="profileImage"
                                className="text-black text-sm font-medium mb-1"
                              >
                                Profile Image
                                <input
                                  id="profileImage"
                                  className="border border-gray-300 rounded-md px-4 py-1.5  focus:outline-none focus:border-blue-500"
                                  type="file"
                                  hidden
                                  accept="image/*"
                                  onChange={(e) => {
                                    setEditedImage(e.target.files[0]);
                                  }}
                                />
                                <div className="border mt-1 flex justify-between items-center border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-blue-500">
                                  {editedImage ? (
                                    <img
                                      src={
                                        typeof editedImage === "string"
                                          ? editedImage
                                          : URL.createObjectURL(editedImage)
                                      }
                                      alt="Profile"
                                      className=" rounded-md h-[26px] w-auto"
                                    />
                                  ) : (
                                    <p>Upload Image</p>
                                  )}
                                  <ArrowUpTrayIcon className="h-6 w-6  right-0 bottom-0  text-blue-500 cursor-pointer" />
                                </div>
                              </label>
                            </div> */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="memberType"
                  className="block text-sm font-medium leading-3 text-gray-900"
                >
                  Member Type <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="memberType"
                    name="memberType"
                    required
                    value={memberType}
                    onChange={(e) => setMemberType(e.target.value)}
                    className="block w-full mt-1 rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm "
                  >
                    {" "}
                    <option value="">Select Member Type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Temporary">Temporary</option>
                    {/* <option value="not to say">Prefer Not To Say</option> */}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-3 text-gray-900"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    required
                    id="street-address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm "
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-3 text-gray-900"
                >
                  State <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    value={region}
                    required
                    onChange={(e) => setRegion(e.target.value)}
                    className="block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm "
                  >
                    <option value="">Select a state</option>
                    {states.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-3 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm "
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-3 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    maxLength={6}
                    minLength={6}
                    value={postalCode}
                    onChange={handlePostalChange}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end gap-x-6">
          {/* <button
            type="button"
            className="text-sm font-semibold leading-3 text-gray-900"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            className="bg-[#34BE82] my-1   text-white font-semibold px-4 py-2 rounded-md ml-2 focus:outline-none"
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
              "Submit"
            )}
          </button>
        </div>
      </form>
    </ThemeWrapper>
  );
};
export default NewMemberForm;
export async function getServerSideProps(context) {
  if (!context.req.cookies.loggedIn) {
    return {
      props: {},
      redirect: { destination: "/login" },
    };
  }
  const props = {};
  return {
    props,
  };
}
