import React from "react";

const Card = (props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 my-2">
      {props?.selectFilteredFacalities?.map((item) => {
        return (
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-md ">
            <div class="  h-[160px] overflow-hidden px-4 pt-4">
              <img src={item.FacilityImageWeb}/>
            </div>
            <div class="flex flex-col items-center px-4 py-2">
              <div
                class="bg-red-700 cursor-pointer p-1 text-center rounded-md text-white  w-full"
                onClick={() => {
                  props.setDeleteModal(true);
                  props.setDeleteImageUUID(item.FacilityImageUUID);
                }}
              >
                Delete Image
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
