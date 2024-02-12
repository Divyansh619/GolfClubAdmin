import React, { useState, useEffect } from "react";
import EditManagingCommiteeModal from "../Modals/EditManagingCommiteeModal";
import DeleteModal from "../Modals/DeleteModal";
import SuccessModal from "../Modals/SuccessModal";
import FilterDate from "../FilterDate";
import AddManagingCommiteeModal from "../Modals/AddManagingCommiteeModal";
import ManagingCommiteeTable from "./ManagingCommiteeTable";
import Table from "../Table";
import UpdateCaptainModal from "../Modals/UpdateCaptainModal";
import AddMembersModal from "../Modals/AddMembersModal";
import SuccessMessage from "../Modals/SuccessMessage";
import NoDataFound from "../NoDataFound";
import SearchPagination from "../SearchPagination";
import { useRouter } from "next/router";

const ManagingCommitee = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [managingCommiteeData, setManagingCommiteeData] = useState([]);
  const [filterListData, setFilterListData] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [managingSection, setManagingSection] = useState([]);
  const [searchedPages, setSearchedPages] = useState(0);

  useEffect(() => {
    managingCommiteeList();
    getPosition();
  }, []);

  const getPosition = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/ManagingCommitteeDropDownByPosition",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setManagingSection(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const fileSizeInMB = file.size / (1024 * 1024);

  //   if (fileSizeInMB > 2) {
  //     setErrorMessage("Image size exceeds 2MB");
  //     return;
  //   }

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setImagePreview(null);
  //   }
  // };

  const functionDelete = async () => {
    setLoading("delete");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ManagingCommitteeUUID: filterListData.ManagingCommitteeUUID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/ManagingCommitteeDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          //   setBannerListApiData(result.data);
          setMessage("Managing committee member deleted successfully!!");
          setSuccess(true);
          setOpen(true);
          setDeleteModal(false);
          managingCommiteeList();
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
          setDeleteModal(false);
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

  const managingCommiteeList = async (page) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      page: page || 1,
      content: 10,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AdminManagingCommitteeList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSearchedPages(Math.ceil(result.count / 20));
          setManagingCommiteeData(result.data);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
      />
      {openModal && (
        <UpdateCaptainModal
          open={openModal}
          managingSection={managingSection}
          setOpen={setOpenModal}
          managingCommiteeList={managingCommiteeList}
          filterListData={filterListData}
          heading={"Managing Commitee"}
        />
      )}
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
      {addMemberModal && (
        <AddMembersModal
          open={addMemberModal}
          setOpen={setAddMemberModal}
          managingSection={managingSection}
          btn={"Add"}
          managingCommiteeList={managingCommiteeList}
          heading={"Managing Commitee"}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
        />
      )}
      <div className="flex justify-between items-center mt-6">
        {/* #Add_Member */}
        <div>
          <button
            onClick={() => setAddMemberModal(true)}
            className="bg-[#34BE82] my-1 text-white font-semibold px-4 py-2 rounded-md ml-2 focus:outline-none"
          >
            Add New Member
          </button>
        </div>
      </div>

      {managingCommiteeData.length > 0 ? (
        <>
          {" "}
          <Table
            setFilterListData={setFilterListData}
            tableData={managingCommiteeData}
            openModal={openModal}
            setOpenModal={setOpenModal}
            setDeleteModal={setDeleteModal}
            setSuccessModal={setSuccessModal}
            setImagePreview={setImagePreview}
            imagePreview={imagePreview}
          />
          {searchedPages ? (
            <SearchPagination
              pageNumber={1}
              maxPages={searchedPages}
              searchFunction={managingCommiteeList}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default ManagingCommitee;
