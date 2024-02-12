import FilterDate from "@/Components/FilterDate";
import Heading from "@/Components/Heading";
import NoDataFound from "@/Components/NoDataFound";
import ContactUsTable from "@/Components/Tables/ContactUsTable";
import ThemeWrapper from "@/Components/ThemeWrapper";
import React, { useEffect, useState } from "react";
import SearchPagination from "../Components/SearchPagination.js";
import { useRouter } from "next/router";

const ContactUs = () => {
  const [contactUsListListData, setContactUsListData] = useState([]);
  const [clickContact, setClickContact] = useState("Contact Us Table");
  const [searchedPages, setSearchedPages] = useState(0);
  const { query } = useRouter();

  const pageNumber = query.page;

  useEffect(() => {
    ContactUsList();
  }, []);

  const ContactUsList = (page) => {
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
      "https://stgadmin.sasone.in/api/LGCadmin/AdminContactUsList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setContactUsListData(result.data);
          setSearchedPages(Math.ceil(result.count / 20));
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const tabs = [
    { name: "Contact Us Table", href: "#", current: false },
    { name: "Contact Us Details", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <ThemeWrapper menu={"Contact Us"}>
      <div className="sm:mt-4">
        <Heading heading={"Contact US"} />
      </div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          // defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>

      {/* #SM/ */}
      <div className="hidden sm:block">
        <nav
          className="bg-[#34BE82] rounded-lg p-3 mt-2 overflow-x-auto"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              onClick={() => setClickContact(tab.name)}
              className={classNames(
                tab.name === clickContact
                  ? "border border-2 border-[#FCFBDB] text-white"
                  : "text-white  hover:bg-white hover:text-[#34BE82]",
                "rounded-md mx-2  px-3 py-2 text-sm font-medium cursor-pointer"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
      {clickContact === "Contact Us Table" ? (
        <div className="mt-8 flow-root">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                {contactUsListListData.length > 0 ? (
                  <>
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
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Subject
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y  divide-gray-200 bg-white">
                        {contactUsListListData?.map((person, index) => (
                          <tr key={index}>
                            <td className="whitespace-pre-wrap   break-words py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                              {index + 1 + 20 * (pageNumber - 1 || 0)}
                            </td>
                            <td className="whitespace-pre-wrap   break-words py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                              {person.Name}
                            </td>
                            <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                              {person.Email}
                            </td>
                            <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                              {person.Phone}
                            </td>
                            <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                              {person.Subject}
                            </td>
                            <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                              {person.Message}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <NoDataFound />
                )}
              </div>
            </div>
            {searchedPages > 1 ? (
              <SearchPagination
                pageNumber={1}
                maxPages={searchedPages}
                searchFunction={ContactUsList}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : clickContact === "Contact Us Details" ? (
        <ContactUsTable />
      ) : (
        ""
      )}
    </ThemeWrapper>
  );
};

export default ContactUs;
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
