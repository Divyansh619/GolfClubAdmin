import React, { useEffect, useState } from "react";
import AddOutstandingBills from "../Modals/AddOutstandingBills";
import UpdateOutstandingBills from "../Modals/UpdateOutstandingBills";
import Table from "../Table";
import SearchPagination from "../SearchPagination";
import NoDataFound from "../NoDataFound";
import TableBills from "./TableBills";

const OutstandingBills = ({memberUUID}) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [memberUUID, setMemberUUID] = useState('');
  const [outstandingData, setOutstandingData] = useState([]);
  const [outstandingAmount, setOutstandingAmount] = useState(null);
  const [filterListData, setFilterListData] = useState("");
  // console.log("memberUUID",memberUUID )
  // console.log("outstandingAmount", outstandingData)
  
  useEffect(()=>{
    outstandingBills()
  },[memberUUID])

  const outstandingBills = () => {
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
  
   fetch("https://stgadmin.sasone.in/api/LGCadmin/GetOutstandingBillsDetails", requestOptions)
   .then((response) => response.json())
      .then((result) => {
        console.log("result-list", result)
        if (result.status_code === 200 && result.status === "Success") {
          setOutstandingAmount(result.data?.GrandTotal)
          setOutstandingData([result.data]);
          
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

 
  const tableHeadings = [
    { title: 'S.No' },
    { title: 'Date' },
    { title: 'Bill No' },
    // {title: 'Total Amount' },
    // {title: 'Discount'},
    {title: 'Outstanding Amount'},
    // {title: 'Edit'},
  ];

  return (
    <div>
      {/* {openAddModal && (
        <AddOutstandingBills open={openAddModal} setOpen={setOpenAddModal} outstandingBills={outstandingBills} memberUUID={memberUUID} />
      )} */}

      {openModal && (
        <UpdateOutstandingBills filterListData={filterListData} open={openModal} setOpen={setOpenModal} outstandingBills={outstandingBills} memberUUID={memberUUID} />
      )}

      {<div className="flex justify-between items-center mt-6">
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#34BE82] my-1 text-white font-semibold px-4 py-2 rounded-md ml-2 focus:outline-none"
          >
            Add Outstanding Amount
          </button>
        </div>
      </div>} 

      {outstandingAmount !== undefined ? (
        <>
          <TableBills
            setFilterListData={setFilterListData}
            tableData={outstandingData}
            openModal={openModal}
            headings={tableHeadings}
            setOpen={setOpenModal}
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


    </div>
  );
};

export default OutstandingBills;
