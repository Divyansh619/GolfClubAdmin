import Heading from "@/Components/Heading";
import NoDataFound from "@/Components/NoDataFound";
import PaginationComp from "@/Components/PaginationComp";
import ThemeWrapper from "@/Components/ThemeWrapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const subscriptionemail = () => {
  const [subscribeListApiData, setSubscribeListApiData] = useState([]);
  const [totalDataCount, setTotalCount] = useState(0);
  const { query } = useRouter();
  const pageNumber = query.page;
  const maxPages = Math.ceil(totalDataCount / 20);

  useEffect(() => {
    NewsletterSubscription(pageNumber);
  }, [pageNumber]);

  const NewsletterSubscription = (page) => {
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
      "https://stgadmin.sasone.in/api/LGCadmin/NewsletterSubscriptionList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSubscribeListApiData(result.data);
          setTotalCount(result.count);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <ThemeWrapper menu={"Subscription"}>
      <div className="sm:flex-auto sm:mt-4">
        <Heading heading={"Subscription"} />
      </div>
      {/* #aboutUsTable */}
      {subscribeListApiData.length > 0 ? (
        <>
          <div className=" flow-root">
            <div className="flex justify-center overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#34BE82]">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                        >
                          S.no
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-sm font-semibold text-white"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-sm font-semibold text-white"
                        >
                          Subscribed
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {subscribeListApiData?.map((person, index) => (
                        <tr key={index} className="">
                          <td className="whitespace-pre-wrap   break-words py-4 pl-4 pr-3 text-sm  text-black sm:pl-6">
                            {index + 1 + 20 * (pageNumber - 1 || 0)}
                          </td>
                          <td className="whitespace-pre-wrap text-center break-words py-4 pl-4 pr-3 text-sm  text-black sm:pl-6">
                            {person.Email}
                          </td>
                          <td className="whitespace-pre-wrap text-center  break-words py-4 pl-4 pr-3 text-sm  text-black sm:pl-6">
                            {person.Subscribed}
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
              pageUrl={"subscriptionemail"}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <NoDataFound />
      )}
    </ThemeWrapper>
  );
};

export default subscriptionemail;
