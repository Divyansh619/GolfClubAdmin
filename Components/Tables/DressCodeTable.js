import { PhotoIcon } from "@heroicons/react/20/solid";
import React from "react";
const DressCodeTable = (props) => {
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
                Title
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Icon
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Image
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Description
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Status
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Edit
              </th>
              {/* <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                Delete
              </th> */}
            </tr>
          </thead>

          <tbody class="divide-y  divide-gray-200">
            {props?.tableData?.map((item, index) => {
              return (
                <tr class="  text-center items-center">
                  <td class="whitespace-pre-wrap   break-words px-4 py-2 font-medium text-black">
                    {index + startingIndex}
                  </td>
                  <td class="whitespace-pre-wrap   break-words px-4 py-2 text-black">
                    {item.Title}
                  </td>
                  <td class="whitespace-pre-wrap   break-words px-4 py-2 text-black">
                    {item.DressCodeIcon ? (
                      <img
                        src={item.DressCodeIcon}
                        alt={`Profile ${item.DressCodeIcon}`}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <PhotoIcon className="w-10 h-10 rounded-full text-gray-300" />
                    )}
                  </td>

                  <td class="whitespace-pre-wrap   break-words px-4 py-2 text-black">
                    {item.DressCodeImage ? (
                      <img
                        src={item.DressCodeImage}
                        alt={`Profile ${item.DressCodeImage}`}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <PhotoIcon className="w-10 h-10 rounded-full text-gray-300" />
                    )}
                  </td>

                  <td class="whitespace-pre-wrap   break-words px-4 py-2 text-black">
                    {item.Description}
                  </td>

                  <td class="whitespace-pre-wrap  break-words px-4 py-2 text-black">
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
                  <td class="inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-black">
                    <img
                      onClick={() => {
                        props.setOpenModal(true);
                        props.setFilterListData(item);
                      }}
                      src="/Icons/edit.png"
                      className="m-auto cursor-pointer m-2 h-8 w-8 transform hover:scale-110 transition duration-300 ease-in-out"
                    />
                  </td>
                  {/* <td class="whitespace-nowrap px-4 py-2 text-black">
                    <img
                      onClick={() => { props.setDeleteModal(true); props.setFilterListData(item) }}
                      src='/Icons/delete.png'
                      className='m-auto h-10 cursor-pointer'
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

export default DressCodeTable;
