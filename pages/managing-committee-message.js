import Heading from "@/Components/Heading";

import DeleteModal from "@/Components/Modals/DeleteModal";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import SuccessModal from "@/Components/Modals/SuccessModal";
import UpdateMessageModal from "@/Components/Modals/UpdateMessageModal";
import NoDataFound from "@/Components/NoDataFound";
import ThemeWrapper from "@/Components/ThemeWrapper";
import React from "react";
import { useEffect, useRef, useState } from "react";

const MemberCommitteeMessage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [addMessageModal, setAddMessageModal] = useState(false);
  const [filterListData, setFilterListData] = useState([]);
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [messageListData, setMessageListData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    messageList();
  }, []);

  const messageList = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AdminManagingCommitteeMessage",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setMessageListData(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <ThemeWrapper menu={"Managing Committee Message"}>
        <SuccessMessage
          open={open}
          setOpen={setOpen}
          message={message}
          success={success}
        />

        {deleteModal && (
          <DeleteModal
            open={deleteModal}
            loading={loading}
            functionDelete={functionDelete}
            setOpen={setDeleteModal}
          />
        )}
        {deleteModal && (
          <SuccessModal open={successModal} setOpen={setSuccessModal} />
        )}
        {openModal && (
          <UpdateMessageModal
            open={openModal}
            setOpen={setOpenModal}
            messageList={messageList}
            filterListData={messageListData}
            btn={"Save"}
            heading={"Message"}
          />
        )}
        <div className="sm:flex-auto sm:mt-4">
          <Heading heading={"Managing Committee Message"} />
        </div>
        {/* <div className="flex justify-between items-center mt-6">
          {/* #Add_Member */}
        {/* <div>
            <button
              onClick={() => setAddMessageModal(true)}
              className="bg-[#34BE82] my-1 text-white font-semibold px-4 py-2 rounded-md ml-2 focus:outline-none"
            >
              Add New Message
            </button>
          </div>
        </div>  */}

        {/* #aboutUsTable */}

        <div className="mt-2 flow-root">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y  divide-gray-200">
                  <thead className="bg-[#34BE82]">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Position
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Image
                      </th>

                      {/* <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Status
                        </th> */}
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y  divide-gray-200 bg-white">
                    <tr className="items-center">
                      <td className="whitespace-pre-wrap   break-words py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                        {messageListData.Name}
                      </td>
                      <td className="whitespace-pre-wrap items-center  break-words py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                        {messageListData.Position}
                      </td>
                      <td className=" whitespace-pre-wrap  break-words px-3 py-4 text-sm text-black">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: messageListData.ManagingCommitteeMessage,
                          }}
                          className=" line-clamp-3"
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-6 text-black grid items-center">
                        <img
                          src={messageListData.Image}
                          alt={`Profile ${messageListData.Image}`}
                          className="w-10 h-10 rounded-full"
                        />
                      </td>

                      {/* <td class="whitespace-pre-wrap   break-words px-3 py-4 text-sm ">
                            {messageListData.IsLive === "1" ? (
                              <span class="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
                                Live
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                                <p className="whitespace-nowrap text-sm">
                                  Not Live
                                </p>
                              </span>
                            )}
                          </td> */}
                      <td class="whitespace-nowrap px-4 py-2 text-black">
                        <img
                          onClick={() => setOpenModal(true)}
                          src="/Icons/edit.png"
                          className="m-auto cursor-pointer h-8 w-8 transform hover:scale-110 transition duration-300 ease-in-out"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ThemeWrapper>
    </div>
  );
};

export default MemberCommitteeMessage;

export async function getServerSideProps(context) {
  if (!context.req.cookies.loggedIn) {
    return {
      props: {},
      redirect: { destination: "/login" },
    };
  }
  const props = {};
  return {
    props,
  };
}
