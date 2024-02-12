import React from "react";
const HoleTable = (props) => {
  const dateHandler = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const monthNameLong = dateObj.toLocaleString("en-US", { month: "short" });
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const month = dateObj.getMonth();
    return (
      (day <= 9 ? "0" : "") +
      day +
      "-" +
      monthNameLong +
      "-" +
      year +
      "," +
      (hour <= 9 ? "0" : "") +
      hour +
      ":" +
      (month <= 9 ? "0" : "") +
      month
    );
  };
  const startingIndex = 1;
  return (
    <div>
      <div class="overflow-x-auto my-4">
        <table class="min-w-full divide-y-2  divide-gray-200 bg-white text-sm">
          <thead class="ltr:text-left rtl:text-right">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                S.No
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Member Name
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Hole No
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Date
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Status
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Edit
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Delete
              </th>
            </tr>
          </thead>

          <tbody class="divide-y  divide-gray-200">
            {props?.tableData?.map((item, index) => {
              return (
                <tr key={index} class="  text-center items-center">
                  <td class="whitespace-nowrap px-4 py-2 font-medium text-black">
                    {item.KeyIndex}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-black">
                    {item.MemberName}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-black">
                    {item.HoleNo}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-black">
                    {dateHandler(item.Date).slice(0, 11)}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-black">
                    {item.IsLive === "1" ? (
                      <span class="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                        <p className="whitespace-nowrap text-sm">Not Live</p>
                      </span>
                    )}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-black">
                    <img
                      onClick={() => {
                        props.setOpenModal(true);
                        props.setFilterListData(item);
                      }}
                      src="/Icons/edit.png"
                      className="m-auto cursor-pointer h-8 w-8 transform hover:scale-110 transition duration-300 ease-in-out"
                    />
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-black">
                    <img
                      onClick={() => {
                        props.setDeleteModal(true);
                        props.setFilterListData(item);
                      }}
                      src="/Icons/delete.png"
                      className="m-auto h-6 w-6 cursor-pointer filter-none grayscale opacity-100 hover:filterhover:grayscale-0 hover:opacity-70 transition duration-300 ease-in-out"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoleTable;
