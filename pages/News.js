import Heading from "@/Components/Heading";
import DeleteModal from "@/Components/Modals/DeleteModal";
import NewsUpdateEditModal from "@/Components/Modals/NewsUpdateEditModal";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import SuccessModal from "@/Components/Modals/SuccessModal";
import UpdateNewsModal from "@/Components/Modals/UpdateNewsModal";
import NoDataFound from "@/Components/NoDataFound";
import PaginationComp from "@/Components/PaginationComp";
import NewSuccessModal from "@/Components/SuccessModalUpdated/NewSuccessModal";
import ThemeWrapper from "@/Components/ThemeWrapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const News = () => {
  const [membershipData, setMembershipData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filterListData, setFilterListData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [newSuccess, setNewSuccesss] = useState(false);
  const [updateSuccess, setUpdateSuccesss] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalDataCount, setTotalCount] = useState(0);
  const { query } = useRouter();
  const pageNumber = query.page;
  const maxPages = Math.ceil(totalDataCount / 20);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // #Update
  const [insertTitle, setInsertTitle] = useState("");
  const [insertImage, setInsertImage] = useState("");
  const [insertisLive, setInsertIsLive] = useState("");
  const [titleerror, setTitleError] = useState("");
  const [imageerror, setImageError] = useState("");
  const formValidation = () => {
    let isValid = true;

    if (insertTitle === "") {
      setTitleError("Please enter a title");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (insertImage === "") {
      setImageError("Please insert a valid image");
      isValid = false;
    } else {
      setImageError("");
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isValidForm = formValidation();
    if (isValidForm) {
      insertNews();
    }
  };

  useEffect(() => {
    AdminLatestUpdatesList();
  }, []);

  const AdminLatestUpdatesList = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      page: pageNumber,
      content: 20,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AdminLatestUpdatesList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setMembershipData(result.data);
          setTotalCount(result.count);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const insertNews = () => {
    setLoading("insert");
    var myHeaders = new Headers();
    setLoading(true);
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("SrNo", 1);
    formdata.append("Title", insertTitle);
    formdata.append("ImagePdfUrl", insertImage);
    formdata.append("IsLive", insertisLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/LatestUpdateInsert",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        if (result.status_code === 200 && result.status === "Success") {
          setInsertTitle("");
          setInsertImage("");
          setInsertIsLive("");
          AdminLatestUpdatesList();
          setAddMemberModal(false);
          // setNewSuccesss(true);
          setSuccess(true);
          setOpen(true)
          setMessage("News added successfully!!");
        } else{
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true)
        }
      })
      .catch((error) => {
        console.log("error", error)
        setMessage("Something went wrong. Please contact support!!");
        setSuccess(false);
        setOpen(true)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteNews = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("UpdateUUID", filterListData.UpdateUUID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/LatestUpdatesDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setDeleteModal(false);
          AdminLatestUpdatesList();
          // setSuccessModal(true);
          setMessage("News deleted successfully!!");
          setSuccess(true);
          setOpen(true)
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      })
      .catch((error) =>{ 
        console.log("error", error)
        setMessage("Something went wrong. Please contact support!!");
        setSuccess(false);
          setOpen(true);
      });
  };

  const startingIndex = 1;

  return (
    <ThemeWrapper menu={"News"}>
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
          description={"News added successfully!!"}
          heading={"Success"}
        />
      )}
      <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
      />

      {successModal && (
        <SuccessModal
          open={successModal}
          setOpen={setSuccessModal}
          description={
            "The item is no longer available after successful deletion."
          }
        />
      )}

      {updateSuccess && (
        <NewSuccessModal
          setOpen={setUpdateSuccesss}
          open={updateSuccess}
          description={"News updated successfully!!"}
          heading={"Success"}
        />
      )}

      {openModal && (
        <UpdateNewsModal
          open={openModal}
          setMessage={setMessage}
          setSuccess={setSuccess}
          setopenmodal={setOpen}
          setOpen={setOpenModal}
          filterListData={filterListData}
          AdminLatestUpdatesList={AdminLatestUpdatesList}
          setUpdateSuccesss={setUpdateSuccesss}
        />
      )}
      {addMemberModal && (
        <NewsUpdateEditModal
          open={addMemberModal}
          setOpen={setAddMemberModal}
          insertisLive={insertisLive}
          insertImage={insertImage}
          insertTitle={insertTitle}
          setInsertIsLive={setInsertIsLive}
          setInsertImage={setInsertImage}
          setInsertTitle={setInsertTitle}
          heading={"Add New News"}
          btn={"Add"}
          functionApi={handleSubmit}
          loading={loading}
          setLoading={setLoading}
          titleerror={titleerror}
          imageerror={imageerror}
          setTitleError={setTitleError}
          setImageError={setImageError}
        />
      )}
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          setOpen={setDeleteModal}
          functionDelete={deleteNews}
        />
      )}


<div className="sm:flex sm:items-center sm:mt-4">
          <div className="sm:flex-auto">
            <Heading heading={"Add News"} />
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setAddMemberModal(true)}
              className="block rounded-md bg-[#34BE82] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Add New News
            </button>
          </div>
        </div>
      <div>
        {membershipData.length > 0 ? (
          <>
            <div class="overflow-x-auto my-2 rounded-lg">
              <table class="min-w-full divide-y-2 border divide-gray-200  bg-white text-sm">
                <thead className="bg-[#34BE82] rounded-lg ">
                  <tr>
                    <th class="whitespace-nowrap px-4 py-4 font-medium text-white">
                      S.No
                    </th>
                    <th class="whitespace-nowrap px-4 py-4 font-medium text-white">
                      Title
                    </th>
                    <th class="whitespace-nowrap px-4 py-4 font-medium text-white">
                      Image
                    </th>

                    <th class="whitespace-nowrap px-4 py-4 font-medium text-white">
                      Status
                    </th>
                    <th class="whitespace-nowrap px-4 py-4 font-medium text-white">
                      Edit
                    </th>
                    <th class="whitespace-nowrap px-4 py-4 font-medium text-white">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y  divide-gray-200">
                  {membershipData?.map((item, index) => {
                    return (
                      <tr class="  text-center items-center">
                        <td class="whitespace-pre-wrap   break-words px-4 py-2 font-medium text-black">
                        {index + 1 + 20 * (pageNumber- 1||0)}
                        </td>
                        <td class="whitespace-pre-wrap   break-words px-4 py-2 text-black">
                          {item.Title}
                        </td>
                        <td class="whitespace-pre-wrap flex justify-center cursor-pointer break-words px-4 py-2 text-black">
                          <a href={item.ImagePdfUrl} target="_blank">
                            <img
                              src={item.ImagePdfUrl}
                              className="h-10"
                              alt="Image Description"
                            />
                          </a>
                        </td>

                        <td class="whitespace-pre-wrap   break-words px-4 py-2 text-black">
                          {item.IsLive === "1" ? (
                            <span class="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
                              Live
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                              <p className="whitespace-pre-wrap   break-words text-sm">
                                Not Live
                              </p>
                            </span>
                          )}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-black">
                          <img
                            onClick={() => {
                              setOpenModal(true);
                              setFilterListData(item);
                            }}
                            src="/Icons/edit.png"
                            className="m-auto cursor-pointer h-8 w-8 transform hover:scale-110 transition duration-300 ease-in-out"
                          />
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-black">
                          <img
                            onClick={() => {
                              setDeleteModal(true);
                              setFilterListData(item);
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
            {maxPages > 1 ? (
              <PaginationComp
                pageNumber={pageNumber}
                maxPages={maxPages}
                pageUrl={"News"}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <NoDataFound />
        )}
      </div>
    </ThemeWrapper>
  );
};

export default News;
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
