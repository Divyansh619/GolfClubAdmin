import React, { useEffect, useState } from "react";
import NoDataFound from "../NoDataFound";
import PaidTable from "./PaidBillsTable";

const PaidBills = ({memberUUID}) => {
  // const [memberUUID, setMemberUUID] = useState('');
  const [paidBillsData, setPaidBillsData] = useState([]);


  const tableHeadings = [
    { title: 'S.No' },
    { title: 'Date' },
    { title: 'Bill No' },
    // {title: 'Total Amount' },
    {title: 'Total Discount'},
    {title: 'Taxable Amount'},
    // {title: 'Tax'},
    {title: 'Grand Total'},
    {title: 'Payment Mode'}
  ];

  // useEffect(() => {
  //   if (memberData?.MemberUUID) {
  //     setMemberUUID(memberData.MemberUUID);
  //   }
  // }, [memberData]);

  useEffect(() => {
    if (memberUUID) {
      paidBills();
    }
  }, [memberUUID]);

  const paidBills = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      MemberUUID: memberUUID,
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
   fetch("https://stgadmin.sasone.in/api/LGCadmin/GetMemberPaidBills", requestOptions)
   .then((response) => response.json())
      .then((result) => {
        // console.log("result", result)
        if (result.status_code === 200 && result.status === "Success") {
          setPaidBillsData(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  return (<div>
    {paidBillsData.length > 0 ? (
        <>
          {" "}
          <PaidTable
            tableData={paidBillsData}
            headings={tableHeadings}
          />
          {/* {searchedPages ? (
            <SearchPagination
              pageNumber={1}
              maxPages={searchedPages}
              searchFunction={managingCommiteeList}
            />
          ) : (
            <></>
          )} */}
        </>
      ) : (
        <NoDataFound />
      )}
  </div>)
};

export default PaidBills;
