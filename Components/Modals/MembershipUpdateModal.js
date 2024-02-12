import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SuccessMessage from "./SuccessMessage";

export default function MembershipUpdateModal(props) {
  // const [open, setOpen] = useState(true);
  const [editTitle, setEditTitle] = useState(props.filterListData.Title);
  const [editDescription, seteditDescription] = useState(
    props.filterListData.Description
  );
  const [editIsLive, setEditIsLive] = useState(props.filterListData.IsLive);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const updateMembership = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();

    formdata.append("Title", editTitle);
    formdata.append("Description", editDescription);
    formdata.append("IsLive", editIsLive ? 1 : 0);
    formdata.append("MembershipUUID", props.filterListData.MembershipUUID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://stgadmin.sasone.in/api/LGCadmin/MembershipUpdate", requestOptions)
      .then((response) => response.json())
      .then((result) => {

        if (result.status_code === 200 && result.status === "Success") {
          setMessage("Membership details updated successfully!!");
          setSuccess(true)
          // props.setUpdateSuccesss(true)
          setOpen(true);
          props.MembershipList()
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      })
      .catch((error) => {
        console.log("error", error)
        setOpen(true);
        setMessage("Something went wrong. Please contact support!!");
        setSuccess(false);
      })
      .finally(() => {
        // props.setReloadPage(!props.reloadPage);
      });
  };

  return (
    <div>
      <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
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
                <Dialog.Panel className="relative transform overflow-hidden  p-4 rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-lg">
                  <div className="max-w-md mx-auto mt-1 bg-white   ">
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
                            Title
                          </label>
                          <input
                            id="name"
                            className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="staffPosition"
                            className="text-black text-sm font-medium mb-1"
                          >
                            Description
                          </label>
                          <textarea
                            id="text"
                            className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                            type="text"
                            rows={4}
                            value={editDescription}
                            onChange={(e) => seteditDescription(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            id="liveStatus"
                            className="mr-2"
                            type="checkbox"
                            checked={editIsLive}
                            onChange={(e) => setEditIsLive(e.target.checked)}
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
                      type="button"
                      className="inline-flex outline-none w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto"
                      onClick={() => updateMembership()}
                    >
                      {props.btn}
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
