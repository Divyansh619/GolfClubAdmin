import FilterDate from "@/Components/FilterDate";
import Heading from "@/Components/Heading";
import AddClubAffiliationModal from "@/Components/Modals/AddClubAffiliationModal";
import DeleteModal from "@/Components/Modals/DeleteModal";
import EditClubAffiliationModal from "@/Components/Modals/EditClubAffiliationModal";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import SuccessModal from "@/Components/Modals/SuccessModal";
import NoDataFound from "@/Components/NoDataFound";
import PaginationComp from "@/Components/PaginationComp";
import ThemeWrapper from "@/Components/ThemeWrapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function ClubAffiliation() {
  const [adminAffiliatedClubsListData, setAdminAffiliatedClubsListData] =
    useState([]);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [addClubModal, setAddClubModal] = useState(false);
  const [filterListData, setFilterListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editName, setEditedName] = useState("");
  const [editMobile, setEditedMobile] = useState("");
  const [editFacalitites, setEditedFacalitites] = useState([]);
  const [editAddress, setEditedAddress] = useState("");
  const [editEmail, setEditedEmail] = useState("");
  const [editWebsite, setEditedWebsite] = useState("");
  const [IsLive, setIsLive] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [facilitiesData, setFacilitiesData] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [totalDataCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { query } = useRouter();
  const [pageNumber, setPageNumber] = useState(query.page);
  const maxPages = Math.ceil(totalDataCount / 20);
  const [titleerror, setTitleError] = useState("");
  const [mobileerror, setMobileError] = useState("");
  const [facalitieserror, setFacalitiesError] = useState("");
  const [addresserror, setAddressError] = useState("");
  const [emailerror, setEmailError] = useState("");

  const formValidation = () => {
    let isValid = true;

    if (editName === "") {
      setTitleError("Please enter a name");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (editMobile === "") {
      setMobileError("Please insert a Mobile number");
      isValid = false;
    } else {
      setMobileError("");
    }

    if (selectedFacilities === "") {
      setFacalitiesError("Please select a facalities");
      isValid = false;
    } else {
      setFacalitiesError("");
    }

    if (editAddress === "") {
      setAddressError("Please enter a address");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (editEmail === "") {
      setEmailError("Please enter a email");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isValidForm = formValidation();

    if (isValidForm) {
      insertClubAffiliation();
    }
  };

  useEffect(() => {
    AffiliatedClubsList();
  }, []);

  useEffect(() => {
    getPosition();
  }, []);

  const AffiliatedClubsList = () => {
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
      "https://stgadmin.sasone.in/api/LGCadmin/AdminAffiliatedClubsList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setData(result.data);
          setTotalCount(result.count);
          setAdminAffiliatedClubsListData(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const cluAffiliationSearch = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    var formdata = new FormData();
    formdata.append("SearchTerm", searchTerm);
    formdata.append("page", pageNumber);
    formdata.append("content", 20);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AffiliatedClubsSearchFilter",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setData(result.data);
          setTotalCount(result.count);
        } else {
          setData([]);
          setTotalCount(0);
        }
      })
      .catch((error) => {
        {
          console.log(error);
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
        }
      });
  };

  const handleSearch = (value) => {
    // const filteredData = data.filter((person) => {
    //   const { ClubName, ClubAddress, ClubEmail } = person;
    //   return (
    //     ClubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     ClubAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     ClubEmail.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // });

    cluAffiliationSearch(value);
    setPageNumber(1);
    setSearchQuery(value);
    // setAdminAffiliatedClubsListData(searchQuery)
  };

  const insertClubAffiliation = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("ClubName", editName);
    formdata.append("ClubMobile", editMobile);
    formdata.append("ClubEmail", editEmail);
    formdata.append("ClubAddress", editAddress);
    formdata.append("IsLive", IsLive ? 1 : 0);
    formdata.append("ClubFacilities", selectedFacilities);
    formdata.append("ClubWebsite", editWebsite);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AffiliatedClubsInsert",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setAddClubModal(false);
          setMessage("Club details added successfully!!");
          setEditedName("");
          setEditedMobile("");
          setSuccess(true);
          setOpen(true);
          AffiliatedClubsList();
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
        setReloadPage(!reloadPage);
      });
  };

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
      "https://stgadmin.sasone.in/api/LGCadmin/AffiliatedClubFacilitiesName",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setFacilitiesData(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const DeleteClubAffiliation = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("ClubUUID", filterListData.ClubUUID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AffiliatedClubsDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("delete", result);
        if (result.status_code === 200 && result.status === "Success") {
          // setSuccessModal(true);
          setMessage("Club details deleted successfully!!");
          setSuccess(true);
          setOpen(true);
          AffiliatedClubsList();
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
      });
  };

  return (
    <ThemeWrapper menu={"Club Affiliation"}>
      <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
      />

      {openModal && (
        <EditClubAffiliationModal
          open={openModal}
          setOpen={setOpenModal}
          filterListData={filterListData}
          data={facilitiesData}
          setSelectedFacilities={setSelectedFacilities}
          AffiliatedClubsList={AffiliatedClubsList}
        />
      )}
      {addClubModal && (
        <AddClubAffiliationModal
          open={addClubModal}
          setOpen={setAddClubModal}
          editName={editName}
          editMobile={editMobile}
          editFacalitites={editFacalitites}
          editAddress={editAddress}
          editEmail={editEmail}
          editWebsite={editWebsite}
          setEditedName={setEditedName}
          setEditedMobile={setEditedMobile}
          setEditedFacalitites={setEditedFacalitites}
          setEditedAddress={setEditedAddress}
          setEditedEmail={setEditedEmail}
          setEditedWebsite={setEditedWebsite}
          setIsLive={setIsLive}
          insertClubAffiliationApi={handleSubmit}
          data={facilitiesData}
          setSelectedFacilities={setSelectedFacilities}
          emailerror={emailerror}
          addresserror={addresserror}
          facalitieserror={facalitieserror}
          mobileerror={mobileerror}
          titleerror={titleerror}
          setTitleError={setTitleError}
          setMobileError={setMobileError}
          setFacalitiesError={setFacalitiesError}
          setAddressError={setAddressError}
          setEmailError={setEmailError}
        />
      )}

      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          setOpen={setDeleteModal}
          functionDelete={DeleteClubAffiliation}
        />
      )}

      {successModal && (
        <SuccessModal
          open={successModal}
          setOpen={setSuccessModal}
          description={"This has been deleted successfully !"}
        />
      )}

      {/* <div className="px-4   sm:px-6 lg:px-8"> */}
      <div className="sm:flex sm:mt-4 sm:items-center">
        <div className="sm:flex-auto">
          <Heading heading={"Club Affiliation"} />
        </div>
      </div>

      <div className="sm:flex flex-col sm:flex-row items-center justify-between">
        {/* Add New Affiliation button */}
        <div className="mb-4 sm:mb-0">
          <button
            type="button"
            onClick={() => setAddClubModal(true)}
            className="block rounded-md bg-[#34BE82] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34BE82]"
          >
            Add New Affiliation
          </button>
        </div>

        {/* Search */}
        <div className="flex-auto">
          <FilterDate
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {data.length > 0 ? (
        <>
          <div className="mt-4 flow-root">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y  divide-gray-200">
                    <thead className="bg-[#34BE82]">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                        >
                          S.No
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                        >
                          Name
                        </th>
                        {/* <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Club Address
                        </th> */}
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Club Website
                        </th>
                        {/* <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Facilities
                        </th> */}
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Club Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Club Mobile
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y  divide-gray-200 bg-white">
                      {data?.map((person, index) => (
                        <tr key={index}>
                          <td class="whitespace-pre-wrap   break-words px-4 py-2 font-medium text-black">
                            {index + 1 + 20 * (pageNumber - 1 || 0)}
                          </td>
                          <td className="whitespace-pre-wrap   break-words py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                            {person.ClubName}
                          </td>
                          {/* <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                            {person.ClubAddress}
                          </td> */}
                          <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                            {person.ClubWebsite}
                          </td>
                          {/* <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                            {person.Facilities}
                          </td> */}
                          <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                            {person.ClubEmail}
                          </td>
                          <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                            {person.ClubMobile}
                          </td>
                          <td class="whitespace-pre-wrap   break-words px-3 py-4 text-sm ">
                            {person.IsLive === "1" ? (
                              <span class="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
                                Live
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                                <p className="whitespace-nowrap text-sm">
                                  Not Live
                                </p>
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap  py-2 text-gray-700">
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
                                // DeleteClubAffiliation(person);
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
              pageUrl={"ClubAffiliation"}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <NoDataFound />
      )}
      {/* </div> */}
    </ThemeWrapper>
  );
}
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
