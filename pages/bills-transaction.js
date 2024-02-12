import Captains from "@/Components/AboutUsSection/Captains";
import ManagingCommitee from "@/Components/AboutUsSection/Managing Commitee";
import OurTeam from "@/Components/AboutUsSection/OurTeam";
import Secretaries from "@/Components/AboutUsSection/Secretaries";
import OutstandingBills from "@/Components/Bills/OutstandingBills";
import PaidBills from "@/Components/Bills/PaidBills";
import Transactions from "@/Components/Bills/Transactions";
import Heading from "@/Components/Heading";
import ThemeWrapper from "@/Components/ThemeWrapper";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const BillsTransaction = () => {
  const [SelectTab, setSelectTab] = useState("Outstanding Bill");
  const router = useRouter();
  const [memberUUID, setMemberUUID] = useState();
  const [memberData, setMemberData] = useState("")


  useEffect(()=>{
    setMemberUUID(JSON.parse(router.query.memberUUID))
    memberDetails()
  },[])

  const memberDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      MemberUUID: JSON.parse(router.query.memberUUID),
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
   fetch("https://stgadmin.sasone.in/api/LGCadmin/MemberProfile", requestOptions)
   .then((response) => response.json())
      .then((result) => {
        console.log("result-list", result)
        if (result.status_code === 200 && result.status === "Success") {
          setMemberData(result.data)
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const tabs = [
    {
      name: "Outstanding Bill",
      href: "#",
      current: SelectTab === "Outstanding Bill" ? true : false,
    },
    {
      name: "Paid Bills",
      href: "#",
      current: SelectTab === "Paid Bills" ? true : false,
    },
    {
      name: "Transactions",
      href: "#",
      current: SelectTab === "Transactions" ? true : false,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const handleTabChange = (e) => {
    setSelectTab(e.target.value);

    const selectedTabName = e.target.value;
  };

  return (
    <div>
      <ThemeWrapper menu={"Bills & Transaction"}>
        <div>
          <div className="sm:flex sm:mt-4 sm:items-center">
            <div className="sm:flex-auto">
              <Heading heading={"Bills & Transaction"} />
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
                href={"member-list"}
                //   onClick={() => setAddClubModal(true)}
                className="block rounded-md bg-[#34BE82] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                View Member List
              </Link>
            </div>
          </div>

          {memberData && (
            <div className="bg-green-50 border border-green-200 shadow-lg rounded-lg p-6 my-6">
              <h3 className="text-2xl font-bold text-green-700 mb-5">
                Member Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-100 rounded-lg shadow">
                  <span className="text-green-700 font-semibold">Name:</span>
                  <span className="ml-2 text-green-600">
                    {memberData.MemberName}
                  </span>
                </div>
                <div className="p-4 bg-green-100 rounded-lg shadow">
                  <span className="text-green-700 font-semibold">Email:</span>
                  <span className="ml-2 text-green-600">
                    {memberData.MemberEmail}
                  </span>
                </div>
                <div className="p-4 bg-green-100 rounded-lg shadow">
                  <span className="text-green-700 font-semibold">Mobile:</span>
                  <span className="ml-2 text-green-600">
                    {memberData.MemberMobile}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border outline-none py-2 border-[#34BE82]  "
              value={SelectTab}
              onChange={handleTabChange}
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.name}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav
              className="flex    space-x-4 bg-[#34BE82] rounded-lg p-2"
              aria-label="Tabs"
            >
              {tabs.map((tab) => (
                <a
                  onClick={() => setSelectTab(tab.name)}
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "border-2 border-[#FCFBDB] text-white"
                      : "text-white  hover:bg-white hover:text-[#34BE82]",
                    "rounded-md  px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
          <div>
            {SelectTab === "Outstanding Bill" ? (
              <OutstandingBills memberUUID={memberUUID} />
            ) : SelectTab === "Paid Bills" ? (
              <PaidBills memberUUID={memberUUID} />
            ) : SelectTab === "Transactions" ? (
              <Transactions memberUUID={memberUUID} />
            ) : (
              ""
            )}
          </div>
        </div>
      </ThemeWrapper>
    </div>
  );
};

export default BillsTransaction;

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
