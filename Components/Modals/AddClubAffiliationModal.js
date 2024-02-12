import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import InputWithCheckBox from "../InputWithCheckbox";

export default function AddClubAffiliationModal(props) {
  const [facilities, setFacilities] = useState([]);
  const cancelButtonRef = useRef(null);

  const streamHandler = (option) => {
    const isChecked = facilities.some(
      (item) => item.FacilityName === option.FacilityName
    );
    if (isChecked) {
      setFacilities(
        facilities.filter((item) => item.FacilityName !== option.FacilityName)
      );
      props.setFacalitiesError("")
    } else {
      setFacilities(facilities.concat(option));
      props.setFacalitiesError("")
    }
  };

  const facilitiesToString = facilities
    .map((item) => item.FacilityName)
    .toString();

  useEffect(() => {
    props.setSelectedFacilities(facilitiesToString);
  }, [facilities]);

  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    const cleanedMobile = inputMobile.replace(/\D/g, "").slice(0, 10);
    props.setEditedMobile(cleanedMobile);
    props.setMobileError("")
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.insertClubAffiliationApi();
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
              <Dialog.Panel className="p-4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-lg">
                <form
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto mt-1 bg-white   "
                >
                  <h1 className="text-center font-semibold my-3">
                    Add New Club Affiliation
                  </h1>
                  <div className="divide-y divide-green-400">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Club Name <span className="text-red-500 mx-1">*</span>
                        </label>
                        <input
                          id="name"
                          className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                          type="text"

                          value={props.editName}
                          onChange={(e) => { props.setEditedName(e.target.value); props.setTitleError("") }}
                        />
                        {props.titleerror && (
                          <p className="text-red-500 text-sm mt-0.5">
                            {props.titleerror}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="staffPosition"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Club Mobile{" "}
                          <span className="text-red-500 mx-1">*</span>
                        </label>
                        <input
                          id="text"
                          className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                          type="text"
                          maxLength={10}
                          value={props.editMobile}
                          onChange={handleMobileChange}
                        />
                        {props.mobileerror && (
                          <p className="text-red-500 text-sm mt-0.5">
                            {props.mobileerror}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="staffPosition"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Facilities{" "}
                          <span className="text-red-500 mx-1">*</span>
                        </label>
                        <InputWithCheckBox
                          data={props.data}
                          required={facilitiesToString ? true : false}
                          priorityHandler={streamHandler}
                          checkedPriority={facilities}
                          facalitieserror={props.facalitieserror}
                          setFacalitiesError={props.setFacalitiesError}
                        />
                        {props.facalitieserror && (
                          <p className="text-red-500 text-sm mt-0.5">
                            {props.facalitieserror}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="staffPosition"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Club Address{" "}
                          <span className="text-red-500 mx-1">*</span>
                        </label>
                        <input
                          id="editedAddress"
                          className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                          type="text"

                          value={props.editedAddress}
                          onChange={(e) => { props.setEditedAddress(e.target.value); props.setAddressError("") }
                          }
                        />
                        {props.addresserror && (
                          <p className="text-red-500 text-sm mt-0.5">
                            {props.addresserror}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="staffPosition"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Club Email{" "}
                          <span className="text-red-500 mx-1">*</span>
                        </label>
                        <input
                          id="email"
                          className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                          type="email"
                    
                          value={props.editedEmail}
                          onChange={(e) => { props.setEditedEmail(e.target.value); props.setEmailError("") }}
                        />
                        {props.emailerror && (
                          <p className="text-red-500 text-sm mt-0.5">
                            {props.emailerror}
                          </p>
                        )}
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
                          value={props.editedWebsite}
                          onChange={(e) =>
                            props.setEditedWebsite(e.target.value)
                          }
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          id="liveStatus"
                          className="mr-2"
                          type="checkbox"
                          checked={props.isLive}
                          onChange={(e) => props.setIsLive(e.target.checked)}
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
                      className="inline-flex outline-none w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#34BE82] sm:ml-3 sm:w-auto"
                      type="submit"
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
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
