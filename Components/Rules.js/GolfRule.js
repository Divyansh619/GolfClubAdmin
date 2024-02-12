import React, { useEffect, useState } from "react";
import DeleteModal from "../Modals/DeleteModal";
import SuccessModal from "../Modals/SuccessModal";
import FilterDate from "../FilterDate";
import CourseTable from "../Tables/CourseTable";
import GolfRulesModal from "../Modals/GolfRulesModal";
import NoDataFound from "../NoDataFound";
import GolfEditModal from "../Modals/GolfEditModal";
import SuccessMessage from "../Modals/SuccessMessage";
import NewSuccessModal from "../SuccessModalUpdated/NewSuccessModal";
import SearchPagination from "../SearchPagination";

const GolfRule = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [courseRuleListData, setCourseRuleListData] = useState([]);
  const [newSuccess, setNewSuccesss] = useState(false);
  const [updateSuccess, setUpdateSuccesss] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [titleerror, setTitleError] = useState("");
  const [searchedPages, setSearchedPages] = useState(0);
  // #Update
  const [filterListData, setFilterListData] = useState([]);

  // #Insert
  const [insertRuleNo, setInsertRuleNo] = useState("");
  const [insertDescription, setInsertDescription] = useState("");
  const [insertisLive, setInsertIsLive] = useState("");

  useEffect(() => {
    CourseRuleList();
  }, []);

  const formValidation = () => {
    let isValid = true;
    if (insertDescription === "") {
      setTitleError("Please enter a rule");
      isValid = false;
    } else {
      setTitleError("");
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isValidForm = formValidation();

    if (isValidForm) {
      InsertCourse();
    }
  };

  const CourseRuleList = (page) => {
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
      "https://stgadmin.sasone.in/api/LGCadmin/AdminCourseRuleList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setCourseRuleListData(result.data);
          setSearchedPages(Math.ceil(result.count / 20));
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const InsertCourse = () => {
    var myHeaders = new Headers();
    setLoading(true);
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("RuleNo", 1);
    formdata.append("RuleDescription", insertDescription);
    formdata.append("IsLive", insertisLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/CourseRuleInsert",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          // setNewSuccesss(true);
          setInsertDescription("")
          setMessage("Course rule added successfully!!");
          setSuccess(true);
          setOpen(true);
          setAddMemberModal(false);
          CourseRuleList();
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
        setLoading(false);
      });
  };

  const DeleteCourse = () => {
    var myHeaders = new Headers();
    setLoading(true);
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("CourseRuleUUID", filterListData.CourseRuleUUID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/CourseRuleDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          // setSuccessModal(true);
          setMessage("Course rule deleted successfully!!");
          setSuccess(true);
          setOpen(true);
          CourseRuleList();
          // setDeleteModal(false);
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
        setLoading(false);
      });
  };

  const updateGolfRules = () => {
    const { CourseRuleUUID, RuleDescription, IsLive } = filterListData;
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("SrNo", 1);
    formdata.append("RuleNo", 1);
    formdata.append("CourseRuleUUID", CourseRuleUUID);
    formdata.append("RuleDescription", RuleDescription);
    // formdata.append("IsLive", IsLive === "1" ? 1 : 0);
    formdata.append("IsLive ", IsLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/CourseRuleUpdate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setOpenModal(false);
          setMessage("Course rule updated successfully!!");
          setSuccess(true);
          setOpen(true);
          CourseRuleList();
          // setUpdateSuccesss(true);
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
        setLoading(false);
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
      {newSuccess && (
        <NewSuccessModal
          setOpen={setNewSuccesss}
          open={newSuccess}
          description={"Course rule added successfully!!"}
          heading={"Success"}
        />
      )}

      {updateSuccess && (
        <NewSuccessModal
          setOpen={setUpdateSuccesss}
          open={updateSuccess}
          description={"Course rule updated successfully!!"}
          heading={"Success"}
        />
      )}

      {openModal && (
        <GolfEditModal
          open={openModal}
          setOpen={setOpenModal}
          btn={"Save"}
          heading={"Update Golf Course Rule "}
          filterListData={filterListData}
          apiFunction={updateGolfRules}
          setEditedTitle={setFilterListData}
          setEditedDescription={setFilterListData}
        />
      )}

      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          setOpen={setDeleteModal}
          functionDelete={DeleteCourse}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {/* {successModal && (
        <SuccessModal
          open={successModal}
          setOpen={setSuccessModal}
          description={
            "The item is no longer available after successful deletion."
          }
        />
      )} */}

      {addMemberModal && (
        <GolfRulesModal
          open={addMemberModal}
          setOpen={setAddMemberModal}
          apiFunction={handleSubmit}
          btn={"Add"}
          titleerror={titleerror}
          setTitleError={setTitleError}
          heading={"Add New Golf Course Rule "}
          editedTitle={insertRuleNo}
          editedDescription={insertDescription}
          isLive={insertisLive}
          setEditedTitle={setInsertRuleNo}
          setEditedDescription={setInsertDescription}
          setIsLive={setInsertIsLive}
          filterListData={filterListData}
          loading={loading}
          setLoading={setLoading}
          description={"This has been added successfully !"}
        />
      )}

      {/* <div>
        <FilterDate />
      </div> */}

      <div>
        {/* #Add_Member */}
        <div>
          <button
            onClick={() => setAddMemberModal(true)}
            className="bg-[#34BE82] my-6   text-white font-semibold px-4 py-2 rounded-md   focus:outline-none"
          >
            Add New Course Rule
          </button>
        </div>
      </div>
      {courseRuleListData.length > 0 ? (
        <>
          <CourseTable
            openModal={openModal}
            setFilterListData={setFilterListData}
            tableData={courseRuleListData}
            setOpenModal={setOpenModal}
            setDeleteModal={setDeleteModal}
            setSuccessModal={setSuccessModal}
            updateGolfRules={updateGolfRules}
          />
          {searchedPages > 1 ? (
            <SearchPagination
              pageNumber={1}
              maxPages={searchedPages}
              searchFunction={CourseRuleList}
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

export default GolfRule;
