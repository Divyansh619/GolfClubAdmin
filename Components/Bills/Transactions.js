import React, { useEffect, useState } from "react";
import NoDataFound from "../NoDataFound";
import TransactionTable from "./TransactionTable";

const Transactions = ({memberUUID}) => {
  // const [memberUUID, setMemberUUID] = useState('');
  const [paidBillsData, setPaidBillsData] = useState([]);


  // useEffect(() => {
  //   if (memberData?.MemberUUID) {
  //     setMemberUUID(memberData.MemberUUID);
  //   }
  // }, [memberData]);

  useEffect(() => {
    if (memberUUID) {
      transactions();
    }
  }, [memberUUID]);

  const transactions = () => {
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
  
   fetch("https://stgadmin.sasone.in/api/LGCadmin/GetMemberTransactions", requestOptions)
   .then((response) => response.json())
      .then((result) => {
        console.log("result", result)
        if (result.status_code === 200 && result.status === "Success") {
          setPaidBillsData(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const tableHeadings = [
    { title: 'S.No' },
    { title: 'Date' },
    { title: 'Time' },
    { title: 'Bill No.' },
    { title: 'Transaction Type'},
    { title: 'Amount'},
    { title: 'Mode'},
    { title: 'Remark'},
  ];

  return (<div>
    {paidBillsData.length > 0 ? (
        <>
          {" "}
          <TransactionTable
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

export default Transactions;
