import React, { useEffect, useState } from "react";
import EditContactDetails from "../Modals/EditContactDetails";
import SearchPagination from "../SearchPagination";
import { useRouter } from "next/router";

const ContactUsTable = (props) => {
  const startingIndex = 1;
  const [golfContactDetails, setGolfContactDetails] = useState([]);
  const [filteredContactDetails, setFilteredContact] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchedPages, setSearchedPages] = useState(0);
  const { query } = useRouter();

  useEffect(() => {
    GolfContactList();
  }, []);

  const GolfContactList = (page) => {
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
      "https://stgadmin.sasone.in/api/LGCadmin/LgClubContactDetailsList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSearchedPages(Math.ceil(result.count / 20));
          setGolfContactDetails(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      {openModal && (
        <EditContactDetails
          open={openModal}
          setOpen={setOpenModal}
          btn={"Save"}
          heading={"Edit Contact Details"}
          filteredContactDetails={filteredContactDetails}
          setFilteredContact={setFilteredContact}
          GolfContactList={GolfContactList}
        />
      )}
      <div class="overflow-x-auto my-4">
        <>
          <table class="min-w-full divide-y-2  divide-gray-200 bg-white text-sm">
            <thead class="text-left">
              <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                  S.No
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                  Description
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                  Mobile
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                  Email
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                  Address
                </th>
                {/* <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                  Status
                </th> */}
                <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                  Edit
                </th>
              </tr>
            </thead>

            <tbody className="divide-y  divide-gray-200 bg-white">
              {golfContactDetails?.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-pre-wrap   break-words py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                    {item.KeyIndex}
                  </td>
                  <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                    {item.Description}
                  </td>
                  <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                    {`${item.Mobile}, ${item.SecondMobile}`}
                  </td>
                  <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                    {item.Email}
                  </td>
                  <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                    {`${item.Address}, ${item.City}, ${item.Pincode}`}
                  </td>
                  {/* <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                    {item.IsLive === "1" ? (
                      <span class="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                        <p className="whitespace-nowrap text-sm">Not Live</p>
                      </span>
                    )}
                  </td> */}
                  <td class="whitespace-nowrap px-4 py-2 text-black">
                    <img
                      onClick={() => {
                        setOpenModal(true);
                        setFilteredContact(item);
                      }}
                      src="/Icons/edit.png"
                      className="m-auto cursor-pointer h-8 w-8 transform hover:scale-110 transition duration-300 ease-in-out"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {searchedPages > 1 ? (
            <SearchPagination
              pageNumber={1}
              maxPages={searchedPages}
              searchFunction={ContactUsTable}
            />
          ) : (
            <></>
          )}{" "}
        </>
      </div>
    </div>
  );
};

export default ContactUsTable;
