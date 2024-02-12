import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function MembershipEditUpdateModal(props) {
  // const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null);

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
                  onSubmit={(e) => { e.preventDefault();props.functionApi()}}
                  className="max-w-md mx-auto mt-1 bg-white"
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
                          Title<span className="text-red-500 mx-1">*</span>
                        </label>
                        <input
                          id="name"
                          className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
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
                          htmlFor="staffPosition"
                          className="text-black text-sm font-medium mb-1"
                        >
                          Description
                          <span className="text-red-500 mx-1">*</span>
                        </label>
                        <textarea
                          id="text"
                          className="border border-gray-300 rounded-md px-4 py-0.5 focus:outline-none focus:border-blue-500"
                          type="text"
                          required
                          rows={4}
                          value={props.insertDescription}
                          onChange={(e) => {
                            props.setInsertDescription(e.target.value);
                            props.setDescriptionError("");
                          }}
                        />
                        {/* {props.descriptionerror && (
                          <p className="text-red-500 text-sm mt-0.5">
                            {props.descriptionerror}
                          </p>
                        )} */}
                      </div>

                      <div className="flex items-center">
                        <input
                          id="liveStatus"
                          className="mr-2 mt-0.5 "
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

                  <div className=" py-3 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="inline-flex outline-none w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#34BE82] sm:ml-3 sm:w-auto"
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
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
