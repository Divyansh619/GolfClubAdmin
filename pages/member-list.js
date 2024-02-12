import Heading from "@/Components/Heading";
import DeleteModal from "@/Components/Modals/DeleteModal";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import SuccessModal from "@/Components/Modals/SuccessModal";
import UpdateMemberList from "@/Components/Modals/Update-Member-List";
import NoDataFound from "@/Components/NoDataFound";
import PaginationComp from "@/Components/PaginationComp";
import NewSuccessModal from "@/Components/SuccessModalUpdated/NewSuccessModal";
import ThemeWrapper from "@/Components/ThemeWrapper";
import { PhotoIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const memberlist = () => {
  const [memberListApiData, setMemberListApiData] = useState([]);
  const [totalDataCount, setTotalCount] = useState(0);
  const { query } = useRouter();
  const [filterListData, setFilterListData] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [updateSuccess, setUpdateSuccesss] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const pageNumber = query.page;
  const maxPages = Math.ceil(totalDataCount / 20);
  // const [memberUUID, setMemberUUID] = useState("")

  const router = useRouter();

  useEffect(() => {
    memberListApi(pageNumber);
  }, [pageNumber]);

  const memberListApi = (page) => {
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

    fetch("https://stgadmin.sasone.in/api/LGCadmin/MembersList", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setMemberListApiData(result.data);
          setTotalCount(result.count);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const deleteMember = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("MemberUUID", filterListData.MemberUUID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/MembersDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setDeleteModal(false);
          memberListApi();
          setMessage("Member details deleted successfully!!");
          setSuccess(true);
          setOpen(true);
          // setSuccessModal(true);
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
      <ThemeWrapper menu={"Member-List"}>
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
            description={"Member details updated successfully!!"}
            heading={"Success"}
          />
        )}

        {openModal && (
          <UpdateMemberList
            open={openModal}
            setOpen={setOpenModal}
            filterListData={filterListData}
            memberListApi={memberListApi}
            setUpdateSuccesss={setUpdateSuccesss}
            openSuccess={open}
            setOpenSuccess={setOpen}
            setMessage={setMessage}
            setSuccess={setSuccess}
          />
        )}

        {deleteModal && (
          <DeleteModal
            open={deleteModal}
            setOpen={setDeleteModal}
            functionDelete={deleteMember}
          />
        )}

        <div className="sm:flex sm:mt-4 sm:items-center">
          <div className="sm:flex-auto">
            <Heading heading={"Member List"} />
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href={"new-member-form"}
              //   onClick={() => setAddClubModal(true)}
              className="rounded-md bg-[#34BE82] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Add New Member
            </Link>
          </div>
        </div>

        {/* <div className="sm:flex-auto sm:mt-4">
          <Heading heading={"Member List"} />
        </div> */}
        <div>
          {memberListApiData.length > 0 ? (
            <>
              <div className="mt-4 flow-root">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y  divide-gray-200">
                        <thead className="ltr:text-left bg-[#34BE82] rtl:text-right">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-white sm:pl-6"
                            >
                              S.No
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                            >
                              Member Image
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-white sm:pl-6"
                            >
                              Member Name
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                            >
                              Member Mobile
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                            >
                              Member Email
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                            >
                              State
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                            >
                              Address
                            </th>
                            <th class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-white sm:pl-6">
                              View Bills & Transaction
                            </th>
                            <th class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-white sm:pl-6">
                              Edit
                            </th>
                            <th class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-white sm:pl-6">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y  divide-gray-200 bg-white">
                          {memberListApiData?.map((person, index) => (
                            <tr key={index}>
                              <td class="whitespace-pre-wrap text-center break-words px-4 py-2 font-medium text-black">
                                {index + 1 + 20 * (pageNumber - 1 || 0)}
                              </td>
                              <td className="whitespace-pre-wrap text-center break-words px-4 py-2 font-medium text-black">
                                {person.MemberImage ? (
                                  <img
                                    src={person.MemberImage}
                                    alt={`Profile ${person.MemberImage}`}
                                    className="w-10 h-10 rounded-full"
                                  />
                                ) : (
                                  <PhotoIcon className="w-10 h-10 rounded-full text-gray-300" />
                                )}
                              </td>

                              <td className=" whitespace-pre-wrap text-center  break-words px-3 py-4 text-sm text-black">
                                {person.MemberName}
                              </td>

                              <td className=" whitespace-pre-wrap  text-center  break-words px-3 py-4 text-sm text-black">
                                {person.MemberMobile}
                              </td>
                              <td className=" whitespace-pre-wrap  text-center  break-words px-3 py-4 text-sm text-black">
                                {person.MemberEmail}
                              </td>
                              <td className=" whitespace-pre-wrap  text-center  break-words px-3 py-4 text-sm text-black">
                                {person.State}
                              </td>
                              <td className=" whitespace-pre-wrap  text-center  break-words px-3 py-4 text-sm text-black">
                                {person.Address}
                              </td>
                              <td class="whitespace-nowrap px-4 py-2 text-black">
                                <img
                                  onClick={() => {
                                    router.push({
                                      pathname: "/bills-transaction",
                                      query: {
                                        memberUUID: JSON.stringify(
                                          person.MemberUUID
                                        ),
                                      },
                                    });
                                  }}
                                  src="/Icons/show.png"
                                  className="m-auto cursor-pointer h-6 w-6 transform hover:scale-110 transition duration-300 ease-in-out"
                                />
                              </td>
                              <td class="whitespace-nowrap px-4 py-2 text-black">
                                <img
                                  onClick={() => {
                                    setOpenModal(true);
                                    setFilterListData(person);
                                  }}
                                  src="/Icons/edit.png"
                                  className="m-auto cursor-pointer h-8 w-8 transform hover:scale-110 transition duration-300 ease-in-out"
                                />
                              </td>
                              <td class="whitespace-nowrap px-4 py-2 text-black">
                                <img
                                  onClick={() => {
                                    setDeleteModal(true);
                                    setFilterListData(person);
                                  }}
                                  src="/Icons/delete.png"
                                  className="m-auto h-6 w-6 cursor-pointer filter-none grayscale opacity-100 hover:filterhover:grayscale-0 hover:opacity-70 transition duration-300 ease-in-out"
                                />
                              </td>
                            </tr>
                          ))}
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
                  pageUrl={"member-list"}
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
    </div>
  );
};

export default memberlist;
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
