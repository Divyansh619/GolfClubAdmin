import React, { useState } from "react";
import Card from "../Card";
import FilterDate from "../FilterDate";
import DeleteModal from "../Modals/DeleteModal";
import SuccessMessage from "../Modals/SuccessMessage";
import SuccessModal from "../Modals/SuccessModal";
import UploadImage from "../Modals/UploadImage";
import NoDataFound from "../NoDataFound";

const CardRoom = ({
  selectFilteredFacalities,
  setReloadTab,
  reloadPage,
  setReloadPage,
}) => {
  const [openEditSection, setOpenEditSection] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteImageUUID, setDeleteImageUUID] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hint, setHint] = useState(
    "Upload JPEG, JPG, PNG, or SVG images (max 2MB, 200x200 pixels)"
  );

  const allowedTypes = ["image/jpeg", "image/png", "image/svg", "image/jpg"];

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];

  //   if (!file) {
  //     setPreviewImage(null);
  //     setSelectedFile("");
  //     setErrorMessage("");
  //     return;
  //   }

  //   const fileSizeInMB = file?.size / (1024 * 1024);
  //   if (fileSizeInMB > 2) {
  //     setErrorMessage(
  //       "Image exceeds the 2MB limit. Please reduce its size for upload"
  //     );
  //     setPreviewImage(null);
  //   } else {
  //     setErrorMessage("");
  //   }

  //   if (file && allowedTypes.includes(file.type)) {
  //     setSelectedFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setSelectedFile(null);
  //     setPreviewImage(null);
  //     setErrorMessage("");
  //     // Display an error or handle invalid file type here
  //     console.error("Please select a valid image file (jpg, png, svg, jpeg)");
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Define allowed file types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/jpg",
    ];

    // Clear previous states
    setPreviewImage(null);
    setSelectedFile("");
    setErrorMessage("");

    // Check if file is selected
    if (!file) {
      setErrorMessage("No file selected. Please select an image file.");
      return;
    }

    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
      setPreviewImage(e.target.files[0]);
      setErrorMessage(
        "Invalid file type. Only JPEG, JPG, PNG, and SVG files are allowed."
      );
      return;
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 2) {
      setPreviewImage(e.target.files[0]);
      setErrorMessage(
        "Image exceeds the 2MB limit. Please reduce its size for upload"
      );
      return;
    }

    // If file is valid, proceed to set the file for upload and preview
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = () => {
    if (errorMessage) {
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append(
      "FacilitySectionName",
      selectFilteredFacalities[0].FacilitySectionName
    );
    formdata.append(
      "FacilitySectionUUID",
      selectFilteredFacalities[0].FacilitySectionUUID
    );
    formdata.append("IsLive", 1);
    formdata.append("FacilityImage", selectedFile);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/FacilityImagesInsert",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setMessage("Image Uploaded Successfully!!");
          setSuccess(true);
          setOpen(true);
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setReloadTab(selectFilteredFacalities[0].FacilitySectionName);
        setReloadPage(!reloadPage);
        setOpenEditSection(false);
        setPreviewImage(null);
      });
  };

  const functionDelete = async () => {
    setLoading("delete");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      FacilityImageUUID: deleteImageUUID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/FacilityImagesDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setMessage("Image Deleted Successfully!!");
          setSuccess(true);
          setOpen(true);
          setDeleteModal(false);
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
          setDeleteModal(false);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading("");
        setReloadTab(selectFilteredFacalities[0].FacilitySectionName);
        setReloadPage(!reloadPage);
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
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          loading={loading}
          functionDelete={functionDelete}
          setOpen={setDeleteModal}
        />
      )}
      {deleteModal && (
        <SuccessModal open={successModal} setOpen={setSuccessModal} />
      )}

      {/* #ImageUpload_Section */}
      <button
        onClick={() => setOpenEditSection(!openEditSection)}
        type="button"
        className="focus:outline-none mt-4 text-[#34BE82] border-[#34BE82] border hover:bg-[#34BE82] focus:ring-2 focus:ring-[#34BE82] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:text-white"
      >
        Add New Image
      </button>
      {openEditSection && (
        <UploadImage
          open={openEditSection}
          setOpen={setOpenEditSection}
          handleFileChange={handleFileChange}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          setOpenEditSection={setOpenEditSection}
          uploadImage={uploadImage}
          setSelectedFile={setSelectedFile}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          hint={hint}
        />
      )}

      {/* #Card_Section */}

      {selectFilteredFacalities.length > 0 ? (
        <Card
          openModal={openModal}
          setOpenModal={setOpenModal}
          setDeleteModal={setDeleteModal}
          setSuccessModal={setSuccessModal}
          openEditSection={openEditSection}
          setOpenEditSection={setOpenEditSection}
          selectFilteredFacalities={selectFilteredFacalities}
          setDeleteImageUUID={setDeleteImageUUID}
        />
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default CardRoom;
