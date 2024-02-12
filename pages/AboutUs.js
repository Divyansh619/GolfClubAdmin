import Captains from "@/Components/AboutUsSection/Captains";
import ManagingCommitee from "@/Components/AboutUsSection/Managing Commitee";
import OurTeam from "@/Components/AboutUsSection/OurTeam";
import Secretaries from "@/Components/AboutUsSection/Secretaries";
import Heading from "@/Components/Heading";
import ThemeWrapper from "@/Components/ThemeWrapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AboutUs = () => {
  const [SelectTab, setSelectTab] = useState("Managing Commitee");
  const router = useRouter();

  const tabs = [
    {
      name: "Managing Commitee",
      href: "#",
      current: SelectTab === "Managing Commitee" ? true : false,
    },
    {
      name: "Secretaries",
      href: "#",
      current: SelectTab === "Secretaries" ? true : false,
    },
    {
      name: "Captains",
      href: "#",
      current: SelectTab === "Captains" ? true : false,
    },
    {
      name: "Our Team",
      href: "#",
      current: SelectTab === "Our Team" ? true : false,
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
      <ThemeWrapper menu={"About Us"}>
        <div>
          <div className="sm:mt-4">
            <Heading heading={"About Us"} />
          </div>
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
            {SelectTab === "Managing Commitee" ? (
              <ManagingCommitee />
            ) : SelectTab === "Secretaries" ? (
              <Secretaries />
            ) : SelectTab === "Captains" ? (
              <Captains />
            ) : SelectTab === "Our Team" ? (
              <OurTeam />
            ) : (
              ""
            )}
          </div>
        </div>
      </ThemeWrapper>
    </div>
  );
};

export default AboutUs;
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
