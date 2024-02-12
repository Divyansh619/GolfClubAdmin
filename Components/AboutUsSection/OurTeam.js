import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import DeleteModal from "../Modals/DeleteModal";
import SuccessModal from "../Modals/SuccessModal";
import FilterDate from "../FilterDate";
import OurTeamTable from "../OurTeamTable";
import AddOurTeamModal from "../Modals/AddOurTeamModal";
import SuccessMessage from "../Modals/SuccessMessage";
import NoDataFound from "../NoDataFound";
import NewSuccessModal from "../SuccessModalUpdated/NewSuccessModal";
import SearchPagination from "../SearchPagination";

const OurTeam = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [ourTeamListData, setOurTeamListData] = useState([]);
  const [filterListData, setFilterListData] = useState([]);
  const [managingSection, setManagingSection] = useState([]);
  const [searchedPages, setSearchedPages] = useState(0);
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [updateSuccess, setUpdateSuccesss] = useState(false);
  useEffect(() => {
    OurTeamList();
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
      "https://stgadmin.sasone.in/api/LGCadmin/GolfStaffPositionDropdown",
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

  const functionDelete = async () => {
    setLoading("delete");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      StaffUUID: filterListData.StaffUUID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/GolfStaffDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          //   setBannerListApiData(result.data);
          setMessage("Staff member deleted successfully!!");
          setSuccess(true);
          setOpen(true);
          setDeleteModal(false);
          OurTeamList();
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

  const AddStaff = (name, mobile, email, image, position, islive) => {
    setLoading("insert");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    var formdata = new FormData();
    formdata.append("StaffName ", name);
    formdata.append("StaffMobile ", mobile);
    formdata.append("StaffEmail ", email);
    formdata.append("StaffImage ", image);
    formdata.append("StaffPosition ", position);
    formdata.append("IsLive ", islive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/GolfStaffInsert",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setMessage("Staff member added successfully!!");
          setSuccess(true);
          setOpen(true);
          OurTeamList();
          setAddMemberModal(false);
        } else {
          setMessage("Something went wrong.Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      })
      .catch((error) => {
        setMessage("Something went wrong.Please contact support!!");
        setSuccess(false);
        setOpen(true);
      })
      .finally(() => {
        setLoading("");
      });
  };

  const UpdateStaff = (
    StaffUUID,
    name,
    mobile,
    email,
    image,
    position,
    islive
  ) => {
    setLoading("insert");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    var formdata = new FormData();
    formdata.append("StaffName ", name);
    formdata.append("StaffUUID ", StaffUUID);
    formdata.append("StaffMobile ", mobile);
    formdata.append("StaffEmail ", email);
    formdata.append("StaffImage ", typeof image === "string" ? "" : image);
    formdata.append("StaffPosition ", position);
    formdata.append("IsLive ", islive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/GolfStaffUpdate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          // setUpdateSuccesss(true);
          // setOpenModal(false);
          setMessage("Staff member updated successfully!!");
          setSuccess(true);
          setOpen(true);
          setOpenModal(false);
          OurTeamList();
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
  const OurTeamList = async (page) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      page: page,
      content: 20,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AdminGolfStaffList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setOurTeamListData(result.data);
          setSearchedPages(Math.ceil(result.count / 20));
        } else console.log("Error");
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
        <Modal
          open={openModal}
          UpdateStaff={UpdateStaff}
          managingSection={managingSection}
          setOpen={setOpenModal}
          filterListData={filterListData}
        />
      )}
      {updateSuccess && (
        <NewSuccessModal
          setOpen={setUpdateSuccesss}
          open={updateSuccess}
          description={"Staff member updated successfully!"}
          heading={"Success"}
        />
      )}
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          setOpen={setDeleteModal}
          functionDelete={functionDelete}
        />
      )}
      {deleteModal && (
        <SuccessModal open={successModal} setOpen={setSuccessModal} />
      )}
      {addMemberModal && (
        <AddOurTeamModal
          managingSection={managingSection}
          AddStaff={AddStaff}
          open={addMemberModal}
          setOpen={setAddMemberModal}
          btn={"Add"}
          heading={"Our Team "}
        />
      )}
      <div className="flex justify-between items-center mt-6">
        {/* <div className="mr-4">
          <FilterDate />
        </div> */}

        {/* #Add_Member */}
        <div>
          <button
            onClick={() => setAddMemberModal(true)}
            className="bg-[#34BE82] my-1 text-white font-semibold px-4 py-2 rounded-md ml-2 focus:outline-none"
          >
            Add New Our Team
          </button>
        </div>
      </div>

      {ourTeamListData.length > 0 ? (
        <>
          {" "}
          <OurTeamTable
            setFilterListData={setFilterListData}
            tableData={ourTeamListData}
            openModal={openModal}
            setOpenModal={setOpenModal}
            loading={loading}
            setDeleteModal={setDeleteModal}
            setSuccessModal={setSuccessModal}
          />
          {searchedPages > 1 ? (
            <SearchPagination
              pageNumber={1}
              maxPages={searchedPages}
              searchFunction={OurTeamList}
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

export default OurTeam;
