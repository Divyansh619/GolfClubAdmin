import React from "react";

const ManagingCommiteeTable = (props) => {
  const startingIndex = 1;

  return (
    <div>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y-2  divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">
                S.No
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">
                Profile Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">
                Position
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">
                Start Year
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">
                End Year
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">
                Status
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">
                Edit
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y  divide-gray-200">
            {props?.tableData?.map((item, index) => {
              return (
                <tr
                  className="  text-center items-center"
                  key={index}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-black">
                    {index + startingIndex}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-black grid place-items-center">
                    <img
                      src={item.Image}
                      alt={`Profile ${item.Image}`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-black">
                    {item.Name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-black">
                    {item.Position}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-black">
                    {item.IsLive === "1" ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
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
                      onClick={() => props.setDeleteModal(true)}
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

export default ManagingCommiteeTable;
