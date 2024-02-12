import React, { useEffect, useState } from "react";
import DeleteModal from "../Modals/DeleteModal";
import SuccessModal from "../Modals/SuccessModal";
import FilterDate from "../FilterDate";
import AddMembersModal from "../Modals/AddMembersModal";
import HoleTable from "../Tables/HoleTable";
import EditHoleinOneModal from "../Modals/EditHoleinOneModal";
import AddHoleInOne from "../Modals/AddHoleInOne";
import SuccessMessage from "../Modals/SuccessMessage";
import NoDataFound from "../NoDataFound";
import SearchPagination from "../SearchPagination";

const HoleinOne = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [holeInOneListData, setHoleInOneListData] = useState([]);
  const [filterListData, setFilterListData] = useState([]);
  const [searchedPages, setSearchedPages] = useState(0);
  useEffect(() => {
    HoleInOneList();
  }, []);

  const HoleInOneList = (page) => {
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
      "https://stgadmin.sasone.in/api/LGCadmin/AdminHoleInOneList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSearchedPages(Math.ceil(result.count / 20));
          setHoleInOneListData(result.data);
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
        setDeleteModal(false);
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
      MemberID: filterListData.MemberID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/HoleInOneDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          //   setBannerListApiData(result.data);
          setMessage("Hole-In-One deleted successfully!!");
          setSuccess(true);
          setOpen(true);
          HoleInOneList();
          setDeleteModal(false);
          // managingCommiteeList();
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
        setDeleteModal(false);
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
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          loading={loading}
          functionDelete={functionDelete}
          setOpen={setDeleteModal}
        />
      )}

      {openModal && (
        <EditHoleinOneModal
          open={openModal}
          setOpen={setOpenModal}
          HoleInOneList={HoleInOneList}
          filterListData={filterListData}
        />
      )}
      {addMemberModal && (
        <AddHoleInOne
          open={addMemberModal}
          setOpen={setAddMemberModal}
          btn={"Add"}
          HoleInOneList={HoleInOneList}
          heading={"Hole-in-One"}
        />
      )}

      {/* #Add_Member */}
      <div>
        <button
          onClick={() => setAddMemberModal(true)}
          className="bg-[#34BE82] my-6   text-white font-semibold px-4 py-2 rounded-md  focus:outline-none"
        >
          Add New Hole-In-One
        </button>
      </div>
      {holeInOneListData.length > 0 ? (
        <>
          <HoleTable
            setFilterListData={setFilterListData}
            tableData={holeInOneListData}
            openModal={openModal}
            setOpenModal={setOpenModal}
            setDeleteModal={setDeleteModal}
            setSuccessModal={setSuccessModal}
          />
          {searchedPages ? (
            <SearchPagination
              pageNumber={1}
              maxPages={searchedPages}
              searchFunction={HoleInOneList}
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

export default HoleinOne;
