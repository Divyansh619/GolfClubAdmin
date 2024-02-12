import React from "react";
import NoDataFound from "./NoDataFound";
import { PhotoIcon } from "@heroicons/react/20/solid";
const Table = (props) => {
  const startingIndex = props.index||1;
  return (
    <div>
      <div class="overflow-x-auto my-4">
        <table class="min-w-full divide-y-2  divide-gray-200 bg-white text-sm">
          <thead class="ltr:text-left rtl:text-right">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                S.No
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Profile Image
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Position
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Start Year
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                End Year
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Edit
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Delete
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            {props?.tableData?.map((item, index) => {
              return (
                <tr class=" text-center items-center">
                  <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.KeyIndex}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-black grid place-items-center">
                 { item.Image?  <img
                      src={item.Image}
                      alt={`Profile ${item.Image}`}
                      className="w-10 h-10 rounded-full"
                    />:<PhotoIcon className="w-10 h-10 rounded-full text-gray-300"/>}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.Name}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.Position}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.StartDate}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.EndDate}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
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

export default Table;
