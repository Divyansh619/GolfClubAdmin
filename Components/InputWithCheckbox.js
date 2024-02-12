import React from "react";
import { Fragment } from "react";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
const InputWithCheckBox = (props) => {
  return (
    <div className="mt-1">
      <div className="flow-root">
        <Popover.Group className="w-full  divide-gray-200">
          <Popover className=" relative block text-left ">
            <Popover.Button
              className={`flex justify-between w-full rounded-md border-gray-300 p-1 border  outline-[#34BE82]  sm:text-sm `}
            >
              {props.checkedPriority.length > 0 ? (
                <span className="truncate">
                  {" "}
                  {props.checkedPriority.map((item, index) => {
                    return (
                      item.FacilityName +
                      "" +
                      (index + 1 === props.checkedPriority.length ? "" : ", ")
                    );
                  })}
                </span>
              ) : (
                <span> {"Select Facilities"}</span>
              )}

              <ChevronDownIcon
                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Popover.Panel className="origin-top-right absolute right-0 mt-2 z-10 w-full  bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto h-[300px]">
                <form className="space-y-4">
                  {props.data?.map((option, optionIdx) => (
                    <div
                      className={`${props.disable ? "pointer-events-none opacity-80" : ""
                        }`}
                    >
                      <div key={optionIdx} className="flex items-center">
                        <input
                          id={`filter-${optionIdx}`}
                          type="checkbox"
                          required
                          className="h-4 w-4 border-gray-300 rounded text-[#34BE82] focus:ring-[#34BE82] cursor-pointer	"
                          onChange={() => {
                            props.priorityHandler(option);
                          }}
                          checked={props.checkedPriority.some(
                            (item) => item.FacilityName === option.FacilityName
                          )}
                        />

                        <label
                          htmlFor={`filter-${optionIdx}`}
                          className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap cursor-pointer	hover:text-[#34BE82]"
                        >
                          {option.FacilityName}
                        </label>
                      </div>
                    </div>
                  ))}
                </form>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>

      </div>
    </div>
  );
};

export default InputWithCheckBox;
