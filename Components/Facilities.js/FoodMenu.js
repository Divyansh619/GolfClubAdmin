import React, { useState } from "react";
import AddFoodMenu from "../Modals/AddFoodMenu";
import SuccessMessage from "../Modals/SuccessMessage";
import NewSuccessModal from "../SuccessModalUpdated/NewSuccessModal";

const FoodMenu = (props) => {
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [FacilitySectionName, setFacilitySectionName] = useState(
    props?.selectFilteredFacalities[0]?.FacilitySectionName
  );
  const [FacilitySectionUUID, setFacilitySectionUUID] = useState(
    props?.selectFilteredFacalities[0]?.FacilitySectionUUID
  );
  const [filteredItem, setFilteredItem] = useState([]);
  const startingIndex = 1;
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [check, setcheckOpen] = useState(false);

  // console.log(check);
  return (
    <div className="mt-6">
      <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
      />
      {updateSuccess && (
        <NewSuccessModal
          setOpen={setUpdateSuccess}
          open={updateSuccess}
          description={"The Restaurant Menu Has Been Updated Successfully!"}
          heading={"Success"}
        />
      )}

      {openFoodModal && (
        <AddFoodMenu
          open={openFoodModal}
          setUpdateSuccess={setUpdateSuccess}
          setOpen={setOpenFoodModal}
          setcheckOpen={setcheckOpen}
          filteredItem={filteredItem}
          FacilitySectionUUID={FacilitySectionUUID}
          FacilitySectionName={FacilitySectionName}
          filteredTabs={props.filteredTabs}
        />
      )}

      <div>
        <div class="overflow-x-auto my-4">
          <table class="min-w-full divide-y-2  divide-gray-200 bg-white text-sm">
            <thead class="ltr:text-left rtl:text-right">
              <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                  S.No
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-black">
                  Floor
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

            <tbody class="divide-y divide-gray-200">
              {props?.selectFilteredFacalities?.map((item, index) => {
                return (
                  <tr class=" text-center items-center">
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-black">
                      {index + startingIndex}
                    </td>
                    <td class="flex items-center justify-center whitespace-nowrap px-4 py-2 text-black">
                      {item.SubSectionName === "FoodMenu1" ? (
                        <span class="whitespace-nowrap px-4 py-2 font-medium text-black">
                          Ground Floor
                        </span>
                      ) : (
                        <span class="whitespace-nowrap px-4 py-2 font-medium text-black">
                          First Floor
                        </span>
                      )}
                      <a
                        href={item.FacilityImageWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/Icons/pdf.png"
                          alt="View PDF"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </a>
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
                          setOpenFoodModal(true);
                          setFilteredItem(item);
                        }}
                        src="/Icons/edit.png"
                        className="m-auto cursor-pointer h-8 w-8 transform hover:scale-110 transition duration-300 ease-in-out"
                      />
                    </td>
                    {/* <td class="whitespace-nowrap px-4 py-2 text-black">
                      <img
                        // onClick={() => {props.setDeleteModal(true);props.setFilterListData(item)}}
                        src="/Icons/delete.png"
                        className="m-auto h-10 cursor-pointer"
                      />
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
