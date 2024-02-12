import Heading from "@/Components/Heading";
import DeleteModal from "@/Components/Modals/DeleteModal";
import MembershipEditUpdateModal from "@/Components/Modals/MembershipEditUpdateModal";
import MembershipUpdateModal from "@/Components/Modals/MembershipUpdateModal";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import SuccessModal from "@/Components/Modals/SuccessModal";
import NoDataFound from "@/Components/NoDataFound";
import PaginationComp from "@/Components/PaginationComp";
import NewSuccessModal from "@/Components/SuccessModalUpdated/NewSuccessModal";
import ThemeWrapper from "@/Components/ThemeWrapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MembershipRules = () => {
  const [membershipData, setMembershipData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filterListData, setFilterListData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [deleteMembershipUUID, setDeleteMembershipUUID] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [newSuccess, setNewSuccesss] = useState(false);
  const [updateSuccess, setUpdateSuccesss] = useState(false);
  const [totalDataCount, setTotalCount] = useState(0);
  const { query } = useRouter();
  const pageNumber = query.page;
  const maxPages = Math.ceil(totalDataCount / 20);

  // #Update
  const [insertTitle, setInsertTitle] = useState("");
  const [insertDescription, setInsertDescription] = useState("");
  const [insertisLive, setInsertIsLive] = useState("");
  const [titleerror, setTitleError] = useState("");
  const [descriptionerror, setDescriptionError] = useState("");

  const formValidation = () => {
    let isValid = true;

    if (insertTitle === "") {
      setTitleError("Please enter a title");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (insertDescription === "") {
      setDescriptionError("Please insert a description");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isValidForm = formValidation();

    if (isValidForm) {
      insertMembership();
    }
  };

  useEffect(() => {
    MembershipList(pageNumber);
  }, [reloadPage, pageNumber]);

  const MembershipList = (page) => {
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
      "https://stgadmin.sasone.in/api/LGCadmin/AdminMembershipList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setTotalCount(result.count);
          setMembershipData(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const insertMembership = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("SrNo", "0");
    formdata.append("Title", insertTitle);
    formdata.append("Description", insertDescription);
    formdata.append("IsLive", insertisLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AdminMembershipInsert",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setInsertTitle("");
          setInsertIsLive("");
          setInsertDescription("");
          setAddMemberModal(false);
          setMessage("Membership details added successfully!!");
          setSuccess(true);
          setOpen(true);
          setDeleteModal(false);
          // setMessage("Uploaded Successfully!!");
          // setNewSuccesss(true);
          setOpen(true);
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
        setReloadPage(!reloadPage);
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
      MembershipUUID: deleteMembershipUUID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/MembershipDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status_code === 200 && result.status === "Success") {
          setMessage("Membership details deleted successfully!!");
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
      .catch((error) => {
        console.log("error", error);
        setMessage("Something went wrong. Please contact support!!");
        setSuccess(false);
        setOpen(true);
      })
      .finally(() => {
        setLoading("");
        setReloadPage(!reloadPage);
      });
  };

  const startingIndex = 1;
  return (
    <ThemeWrapper menu={"Membership Rules"}>
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
          description={"Membership details added successfully!!"}
          heading={"Success"}
        />
      )}

      {updateSuccess && (
        <NewSuccessModal
          setOpen={setUpdateSuccesss}
          open={updateSuccess}
          description={"Membership details updated successfully!!"}
          heading={"Success"}
        />
      )}

      {openModal && (
        <MembershipUpdateModal
          open={openModal}
          setOpen={setOpenModal}
          filterListData={filterListData}
          heading={"Update Membership"}
          btn={"Save"}
          MembershipList={MembershipList}
          setUpdateSuccesss={setUpdateSuccesss}
        />
      )}
      {addMemberModal && (
        <MembershipEditUpdateModal
          open={addMemberModal}
          setOpen={setAddMemberModal}
          insertisLive={insertisLive}
          insertDescription={insertDescription}
          insertTitle={insertTitle}
          setInsertIsLive={setInsertIsLive}
          setInsertDescription={setInsertDescription}
          setInsertTitle={setInsertTitle}
          heading={"Add New Membership"}
          btn={"Add"}
          functionApi={handleSubmit}
          descriptionerror={descriptionerror}
          titleerror={titleerror}
          setDescriptionError={setDescriptionError}
          setTitleError={setTitleError}
          loading={loading}
        />
      )}
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          loading={loading}
          setOpen={setDeleteModal}
          functionDelete={functionDelete}
        />
      )}

      {deleteModal && (
        <SuccessModal
          open={successModal}
          setOpen={setSuccessModal}
          message={message}
          success={success}
        />
      )}

      <div className="sm:flex sm:items-center sm:mt-4">
        <div className="sm:flex-auto ">
          <Heading heading={"Membership"} />
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setAddMemberModal(true)}
            className="block rounded-md bg-[#34BE82] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            Add New Membership
          </button>
        </div>
      </div>
      <div>
        <>
          <div className="mt-4 flow-root">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="ltr:text-left bg-[#34BE82] rtl:text-right">
                      <tr className="">
                        <th class="whitespace-nowrap px-4 py-3.5 font-medium text-white">
                          S.No
                        </th>
                        <th class="whitespace-nowrap px-4 py-3.5 font-medium text-white">
                          Title
                        </th>
                        <th class="whitespace-nowrap px-4 py-3.5 font-medium text-white">
                          Description
                        </th>

                        <th class="whitespace-nowrap px-4 py-3.5 font-medium text-white">
                          Status
                        </th>
                        <th class="whitespace-nowrap px-4 py-3.5 font-medium text-white">
                          Edit
                        </th>
                        <th class="whitespace-nowrap px-4 py-3.5 font-medium text-white">
                          Delete
                        </th>
                      </tr>
                    </thead>

                    <tbody class="divide-y  divide-gray-200">
                      {membershipData?.map((item, index) => {
                        return (
                          <tr class="">
                            <td class="whitespace-pre-wrap   break-words px-4 py-2 font-medium text-gray-900">
                              {index + 1 + 20 * (pageNumber - 1 || 0)}
                            </td>
                            <td class="whitespace-pre-wrap   break-words px-4 py-2 text-gray-700">
                              {item.Title}
                            </td>
                            <td class="whitespace-pre-wrap   break-words px-4 py-2 text-gray-700">
                              {item.Description}
                            </td>

                            <td class="whitespace-pre-wrap   break-words px-4 py-2 text-gray-700">
                              {item.IsLive === "1" ? (
                                <span class="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
                                  Live
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                                  <p className="whitespace-nowrap   break-words text-sm">
                                    Not Live
                                  </p>
                                </span>
                              )}
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              <img
                                onClick={() => {
                                  setOpenModal(true);
                                  setFilterListData(item);
                                }}
                                src="/Icons/edit.png"
                                className="m-auto cursor-pointer transform hover:scale-110 transition duration-300 ease-in-out"
                              />
                            </td>
                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                              <img
                                onClick={() => {
                                  setDeleteMembershipUUID(item.MembershipUUID);
                                  setDeleteModal(true);
                                }}
                                src="/Icons/delete.png"
                                className="m-auto h-6 w-6 cursor-pointer filter-none grayscale opacity-100 hover:filterhover:grayscale-0 hover:opacity-70 transition duration-300 ease-in-out"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {maxPages > 1 ? (
            <PaginationComp
              pageNumber={pageNumber}
              maxPages={maxPages}
              pageUrl={"MembershipRules"}
            />
          ) : (
            <></>
          )}
        </>
      </div>
    </ThemeWrapper>
  );
};

export default MembershipRules;
export async function getServerSideProps(context) {
  if (!context.req.cookies.loggedIn) {
    return {
      props: {},
      redirect: { destination: "/login" },
    };
  }
  const props = {};
  return {
    props,
  };
}
