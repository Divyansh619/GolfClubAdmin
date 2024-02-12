import Banquet from "@/Components/Facilities.js/Banquet";
import Bar from "@/Components/Facilities.js/Bar";
import BilliardsSnookers from "@/Components/Facilities.js/Billiards&Snookers";
import CardRoom from "@/Components/Facilities.js/CardRoom";
import ChangingRoom from "@/Components/Facilities.js/ChangingRoom";
import FitnessCenter from "@/Components/Facilities.js/FitnessCenter";
import FoodMenu from "@/Components/Facilities.js/FoodMenu";
import Restaurant from "@/Components/Facilities.js/Restaurant";
import SwimingPool from "@/Components/Facilities.js/SwimingPool";
import Heading from "@/Components/Heading";
import ThemeWrapper from "@/Components/ThemeWrapper";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const Facilities = () => {
  const [SelectTab, setSelectTab] = useState("Swimming Pool");
  const [SelectTabApi, setSelectTabApi] = useState([]);
  const [selectFilteredFacalities, setSelectFilteredFacalities] = useState([]);
  const [reloadTab, setReloadTab] = useState("Swimming Pool");
  const [reloadPage, setReloadPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    facilitiesDropdown();
  }, []);

  useEffect(() => {
    const tabName = SelectTabApi.find(
      (tab) => tab.FacilitySectionName === reloadTab
    );
    if (SelectTabApi.length > 0) {
      filteredTabs(tabName.FacilitySectionUUID);
    }
  }, [SelectTabApi, reloadPage]);
  const handleTabChange = (e) => {
    const selectedValue = e.target.value;
    setSelectTab(selectedValue);

    filteredTabs(e.target.value);
  };

  const facilitiesDropdown = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");
    var formdata = new FormData();
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/FacilitySectionDropdown",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSelectTabApi(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  const filteredTabs = (getId) => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      FacilitySectionUUID: getId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/FacilityImagesListBySection",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSelectFilteredFacalities(result.data);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <ThemeWrapper menu={"Facilities"}>
      <div>
        <div className="sm:mt-4">
          <Heading heading={"Facilities"} />
        </div>

        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>

          <select
            id="tabs"
            name="tabs"
            className="block w-full overflow-hidden rounded-md outline-none border py-2 border-[#34BE82] focus:border-[#34BE82] focus:ring-[#34BE82]"
            value={SelectTab}
            onChange={handleTabChange}
          >
            {SelectTabApi.map((tab) => (
              <option
                key={tab.FacilitySectionName}
                value={tab.FacilitySectionUUID}
              >
                {tab.FacilitySectionName}
              </option>
            ))}
          </select>
        </div>

        {/* #SM_Screen */}
        <div className="hidden sm:block">
          <nav
            className="flex space-x-2 bg-[#34BE82] whitespace-nowrap	overflow-x-scroll hide-scrollbar justify-between  rounded-lg p-2 scroll overflow-x-hidden"
            // style={{ width: 'max-content' }}
            aria-label="Tabs"
          >
            {SelectTabApi.map((tab) => (
              <a
                onClick={() => {
                  setSelectTab(tab.FacilitySectionName);
                  filteredTabs(tab.FacilitySectionUUID);
                }}
                key={tab.FacilitySectionName}
                href={tab.href}
                className={classNames(
                  SelectTab === tab.FacilitySectionName
                    ? "border-2 border-[#FCFBDB] text-white"
                    : "text-white  hover:bg-white hover:text-[#34BE82]",
                  "rounded-md  px-3 py-2 text-sm font-medium cursor-pointer"
                )}
                aria-current={SelectTab ? "page" : undefined}
              >
                {tab.FacilitySectionName}
              </a>
            ))}
          </nav>
        </div>

        {loading ? (
          <div className="w-full h-80 justify-center items-center flex">
            <Oval
              visible={true}
              height="60"
              width="60"
              ariaLabel="Oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          </div>
        ) : (
          <div>
            {SelectTab === "Swimming Pool" ? (
              <SwimingPool
                selectFilteredFacalities={selectFilteredFacalities}
                setReloadTab={setReloadTab}
                loading={loading}
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            ) : SelectTab === "Fitness Center" ? (
              <FitnessCenter
                selectFilteredFacalities={selectFilteredFacalities}
                setReloadTab={setReloadTab}
                reloadPage={reloadPage}
                loading={loading}
                setReloadPage={setReloadPage}
              />
            ) : SelectTab === "FoodMenu" ? (
              <FoodMenu
                selectFilteredFacalities={selectFilteredFacalities}
                filteredTabs={filteredTabs}
              />
            ) : SelectTab === "Restaurant" ? (
              <Restaurant
                selectFilteredFacalities={selectFilteredFacalities}
                setReloadTab={setReloadTab}
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            ) : SelectTab === "Card Room" ? (
              <CardRoom
                selectFilteredFacalities={selectFilteredFacalities}
                setReloadTab={setReloadTab}
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            ) : SelectTab === "Changing Room" ? (
              <ChangingRoom
                selectFilteredFacalities={selectFilteredFacalities}
                setReloadTab={setReloadTab}
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            ) : SelectTab === "Snookers & Billiards" ? (
              <BilliardsSnookers
                selectFilteredFacalities={selectFilteredFacalities}
                setReloadTab={setReloadTab}
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            ) : SelectTab === "Banquet" ? (
              <Banquet
                selectFilteredFacalities={selectFilteredFacalities}
                setReloadTab={setReloadTab}
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            ) : SelectTab === "Bar" ? (
              <Bar
                selectFilteredFacalities={selectFilteredFacalities}
                setReloadTab={setReloadTab}
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </ThemeWrapper>
  );
};

export default Facilities;
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
