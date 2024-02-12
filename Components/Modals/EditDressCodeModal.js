import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function EditDressCodeModal(props) {
  // const [open, setOpen] = useState(true)
  const [editedTitle, setEditedTitle] = useState(props.filterListData.Title);
  const [editedDescription, setEditedDescription] = useState(
    props.filterListData.Description
  );
  const [isLive, setIsLive] = useState(props.filterListData.IsLive);
  const [loading, setLoading] = useState("");
  const [dressCodeIcon, setDressCodeIcon] = useState(
    props.filterListData.DressCodeIcon || ""
  );
  const [dressCodeImage, setDressCodeImage] = useState(
    props.filterListData.DressCodeImage || ""
  );
  // const [success, setSuccess] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [message, setMessage] = useState("")
  const cancelButtonRef = useRef(null);

  const updateDressCode = () => {
    setLoading("insert");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("SrNo", 1);
    formdata.append("Title", editedTitle);
    formdata.append("Description", editedDescription);
    formdata.append(
      "DressCodeImage",
      typeof dressCodeImage === "string" ? "" : dressCodeImage
    );
    formdata.append(
      "DressCodeIcon",
      typeof dressCodeIcon === "string" ? "" : dressCodeIcon
    );
    formdata.append("DressCodeUUID", props.filterListData.DressCodeUUID);
    formdata.append("IsLive ", isLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/DressCodeUpdate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          //   setBannerListApiData(result.data);
          props.setMessage("Hole-In-One Updated Successfully!!");
          // props.setUpdateSuccesss(true);
          props.dressCodeList();
          props.setSuccess(true);
          props.setOpenmodal(true);
          props.dressCodeList();
        } else {
          props.setMessage("Something went wrong. Please contact support!!");
          props.setSuccess(false);
          props.setOpenmodal(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
        props.setMessage("Something went wrong. Please contact support!!");
        props.setSuccess(false);
        props.setOpenmodal(true);
      })
      .finally(() => {
        setLoading("");
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl  p-4 transition-all sm:my-8 w-full sm:max-w-lg">
                <div className="max-w-md mx-auto mt-1 bg-white   ">
                  <h1 className="text-center font-semibold my-3">
                    Update Dress Code
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
                          className="border border-gray-300 rounded-md px-4 py-1.5 focus:outline-none focus:border-blue-500"
                          type="text"
                          value={editedTitle}
                          disabled
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
                          id="startYear"
                          rows={4}
                          className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      </div>

                      {props.filterListData.Title ===
                      "Recommended dress code" ? (
                        ""
                      ) : (
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
                      )}
                    </div>
                  </div>
                </div>
                <div className=" py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex outline-none w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#34BE82] sm:ml-3 sm:w-auto"
                    onClick={() => updateDressCode()}
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
  );
}
