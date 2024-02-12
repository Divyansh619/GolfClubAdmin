const TransactionTable = (props) => {
    const { tableData, headings} = props;
    const startingIndex = 1
  
    function formatISODate(isoDateString) {
     if(isoDateString === "-"){
      return isoDateString
     }
      const date = new Date(isoDateString);
    
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    
      return formattedDate;
    }
  
    return (
      <div>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                {headings.map((heading, index) => (
                  <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {heading.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {tableData?.map((item, index) => {
                return (
                  <tr class=" text-center items-center">
                    <td class="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                      {startingIndex + index}
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-gray-700">
                     {formatISODate(item?.Date || "-")}
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-gray-700">
                     {item?.Time || "00:00"}
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-gray-700">
                      {item?.BillNo || 0}
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-gray-700">
                    {item?.TransactionType || "-"}
                    </td>
                    {/* <td class="whitespace-nowrap px-4 py-4 text-gray-700">
                      {`${item?.Cr || 0} %`}
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-gray-700">
                      {item?.Dr || 0}
                    </td> */}
                   <td className="px-6 py-4 whitespace-nowrap">
                      {item?.TransactionType === "Credit" ? (
                        <span className="text-green-500">
                          +{item?.AmountPay || 0}
                        </span>
                      ) : (
                        <span className="text-red-500">-{item?.AmountPay || 0}</span>
                      )}
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-gray-700">
                      {item?.Mode || 0}
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-gray-700">
                      {item?.Remark || "-"}
                    </td>
                    {/* <td class="whitespace-nowrap px-4 py-4 text-gray-700">
                      {item?.PaymentMode || 0}
                    </td> */}
  
                    {/* <td class="whitespace-nowrap px-4 py-2 text-gray-700">
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
                    {/* <td class="whitespace-nowrap px-4 py-2 text-black">
                      <img
                        onClick={() => {
                          setOpen(true);
                          setFilterListData(item);
                        }}
                        src="/Icons/edit.png"
                        className="m-auto  cursor-pointer h-6 w-6 transform hover:scale-110 transition duration-300 ease-in-out"
                      />
                    </td> */}
                    
                    
                    {/* <td class="whitespace-nowrap px-4 py-2 text-black">
                      <img
                        onClick={() => {
                          props.setDeleteModal(true);
                          props.setFilterListData(item);
                        }}
                        src="/Icons/delete.png"
                        className="m-auto h-6 w-6 cursor-pointer filter-none grayscale opacity-100 hover:filterhover:grayscale-0 hover:opacity-70 transition duration-300 ease-in-out"
                      />
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
export default TransactionTable;
  