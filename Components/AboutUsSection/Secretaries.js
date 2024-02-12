import React, { useEffect, useState } from "react";
import Table from "../Table";
import Modal from "../Modals/Modal";
import DeleteModal from "../Modals/DeleteModal";
import SuccessModal from "../Modals/SuccessModal";
import FilterDate from "../FilterDate";
import AddMembersModal from "../Modals/AddMembersModal";
import UpdateCaptainModal from "../Modals/UpdateCaptainModal";
import NoDataFound from "../NoDataFound";
import SearchPagination from "../SearchPagination";
import SuccessMessage from "../Modals/SuccessMessage";

const Secretaries = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [secretaryData, setSecretaryData] = useState([]);
  const [filterListData, setFilterListData] = useState([]);
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [searchedPages, setSearchedPages] = useState(0);
  useEffect(() => {
    secretaryList();
  }, []);

  const secretaryList = async (page) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      page: page || 1,
      content: 20,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AdminSecretaryList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSearchedPages(Math.ceil(result.count / 20));
          setSecretaryData(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const deleteSecretary = () => {
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
          setMessage("Secretary member deleted successfully!!");
          setSuccess(true);
          setOpen(true);
          setDeleteModal(false);
          secretaryList();
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
        // setDeleteModal(true);
        setSuccess(false);
        setOpen(true);
      })
      .finally(() => {
        setLoading("");
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
      {openModal && (
        <UpdateCaptainModal
          open={openModal}
          setOpen={setOpenModal}
          filterListData={filterListData}
          heading={"Secretary"}
          managingCommiteeList={secretaryList}
        />
      )}
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          setOpen={setDeleteModal}
          functionDelete={deleteSecretary}
        />
      )}
      {/* {deleteModal && (
        <SuccessModal open={successModal} setOpen={setSuccessModal} />
      )} */}
      {addMemberModal && (
        <AddMembersModal
          open={addMemberModal}
          setOpen={setAddMemberModal}
          btn={"Add"}
          heading={"Secretary"}
          managingCommiteeList={secretaryList}
        />
      )}
      <div className="flex justify-between items-center mt-6">
        {/* <div className="mr-4">
          <FilterDate />
        </div> */}

        {/* #Add_Member */}
        {/* <div>
          <button
            onClick={() => setAddMemberModal(true)}
            className="bg-[#34BE82] my-1 text-white font-semibold px-4 py-2 rounded-md ml-2 focus:outline-none"
          >
            Add Member
          </button>
        </div> */}
      </div>
      {secretaryData.length > 0 ? (
        <>
          {" "}
          <Table
            setFilterListData={setFilterListData}
            tableData={secretaryData}
            // index={searchedPages}
            openModal={openModal}
            setOpenModal={setOpenModal}
            setDeleteModal={setDeleteModal}
            setSuccessModal={setSuccessModal}
          />
          {searchedPages ? (
            <SearchPagination
              pageNumber={1}
              maxPages={searchedPages}
              searchFunction={secretaryList}
            />
          ) : (
            <></>
          )}{" "}
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default Secretaries;
