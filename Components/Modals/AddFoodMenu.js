import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SuccessMessage from "./SuccessMessage";
import NewSuccessModal from "../SuccessModalUpdated/NewSuccessModal";

export default function AddFoodMenu(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLive, setIsLive] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage("Please select a PDF file.");
    }
  };

  const updateFoodMenu = () => {
    if (!selectedFile) {
      setErrorMessage("Please select a PDF file.");
      setSuccess(false);
      setOpen(true);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("FacilitySectionUUID", props?.FacilitySectionUUID);
    formdata.append("FacilitySectionName", props?.FacilitySectionName);
    formdata.append("FacilityImage", selectedFile);
    formdata.append("SubSectionName", props?.filteredItem.SubSectionName);
    formdata.append("IsLive", 1);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/FacilityFoodMenuUpdate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {

        if (result.status_code === 200 && result.status === "Success") {
          props.setUpdateSuccess(true)
          // console.log("rrr");
          props.setOpen(false);
          props.filteredTabs(props?.FacilitySectionUUID);
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        // props.setReloadTab(props.FacilitySectionName);
        // props.setReloadPage(!props.reloadPage);
      });
  };

  const cancelButtonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFoodMenu();

  }

  return (
    < >
      {/* <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
      /> */}

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
                <form onSubmit={handleSubmit}>
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  p-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="max-w-md mx-auto mt-1 bg-white   ">
                      <h1 className="text-center font-semibold my-3">
                        Update Food Menu
                      </h1>
                      <div className="divide-y divide-green-400">
                        <div className="flex flex-col space-y-3">
                          <div className="flex flex-col">
                            <label
                              htmlFor="pdfFile"
                              className="text-black text-sm font-medium mb-1"
                            >
                              {props.filteredItem.SubSectionName === "FoodMenu1"
                                ? "Ground Floor"
                                : "First Floor"}
                            </label>
                            <input
                              id="pdfFile"
                              className="border mt-1 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                              type="file"
                              accept=".pdf"
                              onChange={handleFileChange}

                            />
                            {selectedFile && !errorMessage && (
                              <div>Selected PDF: {selectedFile.name}</div>
                            )}
                            {errorMessage && (
                              <div className="text-red-600">{errorMessage}</div>
                            )}{" "}
                            {/* {!errorMessage && (
                            <div className="text-sm text-gray-600 mt-2">
                              Please select a PDF file.
                            </div>
                          )} */}
                          </div>

                          {/* <div className="flex items-center">
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
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex outline-none w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm   sm:ml-3 sm:w-auto"
                      // onClick={() => updateFoodMenu()}
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
                </form>

              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
