import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function UploadImage(props) {
  const cancelButtonRef = useRef(null);
  const [isSelectionMade, setIsSelectionMade] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleClose = () => {
    // Clear preview image on close
    props.setSelectedFile(null);
    props.setPreviewImage(null);
    props.setOpen(false);
    props.setErrorMessage("");
    setIsSelectionMade(false);
    setIsImageSelected(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const isFormValid =
      (!props?.facilityName || isSelectionMade) && isImageSelected;

    if (isFormValid) {
      props.uploadImage();
    }
  };

  const handleSelectionChange = (e) => {
    props.setSubMenu(e.target.value);
    setIsSelectionMade(e.target.value !== "");
  };

  const handleImageChange = (e) => {
    props.handleFileChange(e);
    setIsImageSelected(e.target.files && e.target.files.length > 0);
  };

  const isAddDisabled = props?.facilityName && !isSelectionMade;

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <div className="flex items-center z-50 justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form onSubmit={handleFormSubmit} className="p-6">
                <div className="flex justify-center items-center gap-3">
                  {props?.facilityName && (
                    <div className="flex items-center justify-center cursor-pointer bg-white rounded-md font-medium shadow-md border border-gray-300 hover:border-gray-400 text-xs w-full text-center">
                      <select
                        required
                        id="facility-dropdown"
                        name="facility"
                        className="block w-full pl-3 pr-5 py-2.5 text-base border focus:outline-none focus:ring-gray-200 focus:border-gray-300 sm:text-sm rounded-md"
                        onChange={handleSelectionChange}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Choose restaurant floor
                        </option>
                        <option value="Restaurant1">Ground Floor</option>
                        <option value="Restaurant2">First Floor</option>
                      </select>
                    </div>
                  )}
                  <label
                    htmlFor="file-upload"
                    className="flex items-center z-50 justify-center cursor-pointer bg-white rounded-md font-medium shadow-md py-2 px-3 border border-gray-300 hover:border-gray-400 text-xs w-full text-center"
                  >
                    <span className="mr-2">
                      <ArrowUpTrayIcon className="h-6 w-6 text-[#34BE82] cursor-pointer" />
                    </span>
                    <span className="text-base font-semibold">
                      Add New Image
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".jpg, .png, .svg, .jpeg"
                      className="sr-only"
                      onChange={handleImageChange}
                      required
                    />
                  </label>
                </div>
                {props.hint && (
                  <div className="mt-2 text-sm text-gray-600 text-center">
                    {props.hint}
                  </div>
                )}
                {props.previewImage && (
                  <div className="mt-2">
                    <img
                      src={
                        props.previewImage instanceof File
                          ? URL.createObjectURL(props.previewImage)
                          : props.previewImage
                      }
                      alt="Preview"
                      className="w-40 h-40 border mx-auto object-contain rounded-md shadow-md"
                    />
                  </div>
                )}
                {props.errorMessage && (
                  <div className="text-red-600">{props.errorMessage}</div>
                )}{" "}
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={handleClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 ml-2 text-sm font-medium text-white bg-[#34BE82] border border-transparent rounded-md shadow-sm hover:bg-[#39d08f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#39d08f]"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
