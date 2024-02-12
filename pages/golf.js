import Heading from "@/Components/Heading";
import DressCode from "@/Components/Rules.js/DressCode";
import GolfRule from "@/Components/Rules.js/GolfRule";
import HoleinOne from "@/Components/Rules.js/HoleinOne";
import ThemeWrapper from "@/Components/ThemeWrapper";
import React, { useState } from "react";

const GolfRules = () => {
  const [SelectTab, setSelectTab] = useState("Golf Rules");
  const tabs = [
    {
      name: "Golf Rules",
      current: SelectTab === "Golf Rules" ? true : false,
    },
    {
      name: "Dress Code",
      current: SelectTab === "Dress Code" ? true : false,
    },
    {
      name: "Hole-In-One",
      current: SelectTab === "Hole-In-One" ? true : false,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleTabChange = (event) => {
    setSelectTab(event.target.value);
  };
  return (
    <ThemeWrapper menu={"Golf"}>
      <div>
        <div className="sm:mt-4">
          <Heading heading={"Golf"} />
          <div className="sr-only">version 1.0.1</div>
        </div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>

          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md outline-none border py-2 border-[#34BE82] focus:border-[#34BE82] focus:ring-[#34BE82]"
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
            className="flex space-x-4 bg-[#34BE82] rounded-lg p-2"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <a
                onClick={() => setSelectTab(tab.name)}
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border  border-2 border-white text-white"
                    : "text-white hover:text-white hover:border-white hover:bg-[#34BE82]",
                  "rounded-md cursor-pointer  border-2 border-[#34BE82] hover:border-white px-3 py-2 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
        <div>
          {SelectTab === "Golf Rules" ? (
            <GolfRule />
          ) : SelectTab === "Dress Code" ? (
            <DressCode />
          ) : SelectTab === "Hole-In-One" ? (
            <HoleinOne />
          ) : (
            ""
          )}
        </div>
      </div>
    </ThemeWrapper>
  );
};

export default GolfRules;
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
