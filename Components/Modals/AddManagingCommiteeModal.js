import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function AddManagingCommiteeModal(props) {
  // const [open, setOpen] = useState(true)
  const [editedName, setEditedName] = useState("")
  const [editedPosition, setEditedPosition] = useState("")
  const [isLive, setIsLive] = useState("");
  const [editedImage, setEditedImage] = useState("");

  const cancelButtonRef = useRef(null)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={props.setOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  p-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                <div className="max-w-md mx-auto mt-1 bg-white   ">
                  <h1 className="text-center font-semibold my-3"> Add New {props.heading}</h1>
                  <div className="divide-y divide-green-400">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-black text-sm font-medium mb-1">Name</label>
                        <input
                          id="name"
                          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="staffPosition" className="text-black text-sm font-medium mb-1">Position</label>
                        <input
                          id="staffPosition"
                          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                          type="text"
                          value={editedPosition}
                          onChange={(e) => setEditedPosition(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="profileImage" className="text-black text-sm font-medium mb-1">
                          Profile Image
                        </label>
                        <div className="border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-blue-500">
                          <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                          />
                          {editedImage && typeof editedImage === 'string' ? (
                            <img
                              src={editedImage}
                              alt="Profile Image"
                              className="mt-2 rounded-md max-h-40 w-auto"
                            />
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>


                      <div className="flex items-center">
                        <input
                          id="liveStatus"
                          className="mr-2"
                          type="checkbox"
                          checked={isLive}
                          onChange={(e) => setIsLive(e.target.checked)}
                        />
                        <label htmlFor="liveStatus" className="text-black text-sm font-medium">Live</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex outline-none w-full justify-center rounded-md bg-[#34BE82] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#34BE82] sm:ml-3 sm:w-auto"
                    onClick={() => props.setOpen(false)}
                  >
                    Add
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
  )
}
