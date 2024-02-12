import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SuccessMessage from "./SuccessMessage";

export default function EditHoleinOneModal(props) {
  const [editedName, setEditedName] = useState(props.filterListData.MemberName);
  const [editedHoleNo, setEditedHoleNo] = useState(props.filterListData.HoleNo);
  const [editedDate, setEditedDate] = useState(
    props.filterListData.Date.split("T")[0]
  );
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const cancelButtonRef = useRef(null);
  const [isLive, setIsLive] = useState(
    props.filterListData.IsLive === "1" ? true : false
  );

  const HoleInOneUpdate = () => {
    setLoading("insert");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("MemberName", editedName);
    formdata.append("MemberID", props.filterListData.MemberID);
    formdata.append("Date", editedDate);
    formdata.append("HoleNo", editedHoleNo);
    formdata.append("IsLive ", isLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/HoleInOneUpdate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          //   setBannerListApiData(result.data);
          setMessage("Hole-In-One updated successfully!!");
          setSuccess(true);
          setOpen(true);
          props.HoleInOneList();
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

  const handleHoleNo = (e) => {
    const inputNo = e.target.value;
    const cleanedNo = inputNo.replace(/\D/g, "").slice(0, 2);
    setEditedHoleNo(cleanedNo);
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  p-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        HoleInOneUpdate();
                      }}
                      className="mb-4"
                    >
                      <div className="max-w-md mx-auto mt-1 bg-white   ">
                        <h1 className="text-center font-semibold my-3">
                          Update Hole-In-One
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
                                className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-[#90A955]"
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
                                Hole No.
                              </label>
                              <input
                                id="holeNo"
                                className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                                type="text"
                                maxLength={2}
                                value={editedHoleNo}
                                onChange={handleHoleNo}
                              />
                            </div>

                            <div className="flex flex-col">
                              <label
                                htmlFor="staffPosition"
                                className="text-black text-sm font-medium mb-1"
                              >
                                Date
                              </label>
                              <input
                                id="editedDate"
                                type="date"
                                className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-blue-500"
                                value={editedDate}
                                onChange={(e) => setEditedDate(e.target.value)}
                              />
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
