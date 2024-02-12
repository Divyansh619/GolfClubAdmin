import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import InputWithCheckBox from "../InputWithCheckbox";
import SuccessMessage from "./SuccessMessage";
import Cookies from "js-cookie";

export default function EditClubAffiliationModal(props) {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [editedName, setEditedName] = useState(props.filterListData.ClubName);
  const [editedMobile, setEditedMobile] = useState(
    props.filterListData.ClubMobile
  );
  const [editedEmail, setEditedEmail] = useState(
    props.filterListData.ClubEmail
  );
  const [editedFacalitites, setEditedFacalitites] = useState(
    props.filterListData.Facilities
  );
  const [editedAddress, setEditedAddress] = useState(
    props.filterListData.ClubAddress
  );
  const [editedWebsite, setEditedWebsite] = useState(
    props.filterListData.ClubWebsite
  );
  // const [isLive, setIsLive] = useState(props.filterListData.IsLive );
  const [isLive, setIsLive] = useState(props.filterListData.IsLive === "1");
  const cancelButtonRef = useRef(null);
  const [ClubUUID, setClubUUID] = useState(props.filterListData.ClubUUID);

  const UpdatedBy = Cookies.get("email");

  useEffect(() => {
    const activeFacilities = props.filterListData.Facilities.split("|").map(
      (f) => f.trim()
    );
    const initialFacilities = props.data.filter((facility) =>
      activeFacilities.includes(facility.FacilityName)
    );
    setFacilities(initialFacilities);
  }, [props.data, props.filterListData.Facilities]);

  useEffect(() => {
    setIsLive(props.filterListData.IsLive === "1");
  }, [props.filterListData.IsLive]);

  const streamHandler = (option) => {
    const isChecked = facilities.some(
      (item) => item.FacilityName === option.FacilityName
    );
    if (isChecked) {
      setFacilities(
        facilities.filter((item) => item.FacilityName !== option.FacilityName)
      );
    } else {
      setFacilities([...facilities, option]);
    }
  };

  const facilitiesToString = facilities
    .map((item) => item.FacilityName)
    .toString();

  const updateClubAffiliation = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("ClubUUID", ClubUUID);
    formdata.append("ClubName", editedName);
    formdata.append("ClubMobile", editedMobile);
    formdata.append("ClubEmail", editedEmail);
    formdata.append("ClubAddress", editedAddress);
    formdata.append("IsLive", isLive ? 1 : 0);
    formdata.append("FacilityName", facilitiesToString);
    formdata.append("ClubWebsite", editedWebsite);
    formdata.append("UpdatedBy", UpdatedBy);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AffiliatedClubsUpdate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setMessage("Club details updated successfully!!");
          setSuccess(true);
          setOpen(true);
          props.AffiliatedClubsList();
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      })
      .catch((error) =>{ 
        console.log("error", error)
        setMessage("Something went wrong. Please contact support!!");
        setSuccess(false);
        setOpen(true)
      })
      .finally(() => {
        setLoading("");
      });
  };

  // Handler to close the modal and reset state
  const handleCloseModal = () => {
    props.setOpen(false);
    // Resetting state can be done here if needed
  };

  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    const cleanedMobile = inputMobile.replace(/\D/g, "").slice(0, 10);
    props.setEditedMobile(cleanedMobile);
  };

  return (
    <div>
      <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
        onClose={handleCloseModal}
      />
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
                <Dialog.Panel className="p-4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-lg">
                  <div className="max-w-md mx-auto mt-1 bg-white   ">
                    <h1 className="text-center font-semibold my-3">
                      Update Club Affiliation
                    </h1>
                    <div className="divide-y divide-green-400">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Club Name{" "}
                          </label>
                          <input
                            id="name"
                            className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="staffPosition"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Club Mobile{" "}
                          </label>
                          <input
                            id="text"
                            className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                            type="text"
                            maxLength={10}
                            value={editedMobile}
                            onChange={handleMobileChange}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="staffPosition"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Facilities{" "}
                          </label>
                          <InputWithCheckBox
                            data={props.data}
                            required={facilities.length > 0}
                            priorityHandler={streamHandler}
                            checkedPriority={facilities}
                          />
                          {/* <input
                            id="endYear"
                            className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                            type="editedFacalitites"
                            value={editedFacalitites}
                            onChange={(e) => setEditedFacalitites(e.target.value)}
                          /> */}
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="staffPosition"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Club Address{" "}
                          </label>
                          <input
                            id="editedAddress"
                            className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={editedAddress}
                            onChange={(e) => setEditedAddress(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="staffPosition"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Club Email{" "}
                          </label>
                          <input
                            id="email"
                            className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="staffPosition"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Club Website
                          </label>
                          <input
                            id="editedWebsite"
                            className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={editedWebsite}
                            onChange={(e) => setEditedWebsite(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            id="liveStatus"
                            className="mr-2"
                            type="checkbox"
                            checked={isLive}
                            required
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
                  <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex outline-none w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#34BE82] sm:ml-3 sm:w-auto"
                      onClick={updateClubAffiliation}
                    >
                      Save
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
}
