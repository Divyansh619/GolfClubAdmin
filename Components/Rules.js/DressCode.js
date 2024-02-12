import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import DeleteModal from "../Modals/DeleteModal";
import SuccessModal from "../Modals/SuccessModal";
import FilterDate from "../FilterDate";
import DressCodeTable from "../Tables/DressCodeTable";
import EditDressCodeModal from "../Modals/EditDressCodeModal";
import AddDressCodeModal from "../Modals/AddDressCodeModal";
import NoDataFound from "../NoDataFound";
import SuccessMessage from "../Modals/SuccessMessage";
import NewSuccessModal from "../SuccessModalUpdated/NewSuccessModal";
import SearchPagination from "../SearchPagination";

const DressCode = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [adminDressCodeListData, setAdminDressCodeListData] = useState([]);
  const [filterListData, setFilterListData] = useState([]);
  const [newSuccess, setNewSuccesss] = useState(false);
  const [updateSuccess, setUpdateSuccesss] = useState(false);
  const [searchedPages, setSearchedPages] = useState(0);
  const [sNo, setSNo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dressCodeIcon, setDressCodeIcon] = useState("");
  const [dressCodeImage, setDressCodeImage] = useState("");
  const [isLive, setIsLive] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dressCodeList();
  }, []);

  const dressCodeList = (page) => {
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
      "https://stgadmin.sasone.in/api/LGCadmin/AdminDressCodeList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setAdminDressCodeListData(result.data);
          setSearchedPages(Math.ceil(result.count / 20));
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const InsertDressCode = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("SrNo", 1);
    formdata.append("Title", title);
    formdata.append("Description", description);
    formdata.append("DressCodeImage", dressCodeImage);
    formdata.append("DressCodeIcon", dressCodeIcon);
    formdata.append("IsLive", isLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/DressCodeInsert",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          // setNewSuccesss(true)
          setMessage("Dress code added successfully!!");
          setSuccess(true);
          setOpen(true);
          dressCodeList();
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
      });
  };

  const DeleteDressCode = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("DressCodeUUID", filterListData.DressCodeUUID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/DressCodeDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          // setSuccessModal(true);
          setMessage("Dress code deleted successfully!!");
          setSuccess(true);
          setOpen(true);
          dressCodeList();
          setDeleteModal(false);
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
          description={"Dress code added successfully!!"}
          heading={"Success"}
        />
      )}

      {updateSuccess && (
        <NewSuccessModal
          setOpen={setUpdateSuccesss}
          open={updateSuccess}
          description={"Dress code updated successfully!!"}
          heading={"Success"}
        />
      )}

      {openModal && (
        <EditDressCodeModal
          open={openModal}
          setOpen={setOpenModal}
          filterListData={filterListData}
          setUpdateSuccesss={setUpdateSuccesss}
          dressCodeList={dressCodeList}
          setMessage={setMessage}
          setSuccess={setSuccess}
          setOpenmodal={setOpen}
        />
      )}
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          setOpen={setDeleteModal}
          functionDelete={DeleteDressCode}
        />
      )}
      {successModal && (
        <SuccessModal
          open={successModal}
          setOpen={setSuccessModal}
          description={
            "The item is no longer available after successful deletion."
          }
        />
      )}
      {addMemberModal && (
        <AddDressCodeModal
          open={addMemberModal}
          setOpen={setAddMemberModal}
          functionApi={InsertDressCode}
          dressCodeIcon={dressCodeIcon}
          setDressCodeIcon={setDressCodeIcon}
          sNo={sNo}
          setSNo={setSNo}
          setTitle={setTitle}
          title={title}
          setDescription={setDescription}
          description={description}
          setIsLive={setIsLive}
          isLive={isLive}
          dressCodeImage={dressCodeImage}
          setDressCodeImage={setDressCodeImage}
        />
      )}

      <div></div>
      {adminDressCodeListData.length > 0 ? (
        <>
          <DressCodeTable
            openModal={openModal}
            setFilterListData={setFilterListData}
            tableData={adminDressCodeListData}
            setOpenModal={setOpenModal}
            setDeleteModal={setDeleteModal}
            setSuccessModal={setSuccessModal}
          />
          {searchedPages > 1 ? (
            <SearchPagination
              pageNumber={1}
              maxPages={searchedPages}
              searchFunction={dressCodeList}
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

export default DressCode;
