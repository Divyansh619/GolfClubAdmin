import Heading from "@/Components/Heading";
import AddHTMLModal from "@/Components/Modals/AddHTMLModal";
import DeleteModal from "@/Components/Modals/DeleteModal";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import SuccessModal from "@/Components/Modals/SuccessModal";
import UpdateHTMLModal from "@/Components/Modals/UpdateHTMLModal";
import NoDataFound from "@/Components/NoDataFound";
import ThemeWrapper from "@/Components/ThemeWrapper";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DynamicJoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const history = () => {
  const [openModal, setOpenModal] = useState(false);
  const [filterListData, setFilterListData] = useState([]);
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [aboutUsListData, setAboutUsListData] = useState([]);
  const [addHTMLModal, setAddHTMLModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    aboutUsList();
  }, []);

  const aboutUsList = () => {
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
      "https://stgadmin.sasone.in/api/LGCadmin/AdminAboutUsList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setAboutUsListData(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  const functionDelete = async () => {
    setLoading("delete");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      AboutUsUUID: filterListData.AboutUsUUID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AboutUsDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setMessage("History deleted successfully!!");
          aboutUsList();
          setSuccess(true);
          setOpen(true);
          setDeleteModal(false);
        } else {
          setMessage("Something went wrong. Please contact support!!");
          setSuccess(false);
          setOpen(true);
          setDeleteModal(false);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading("");
      });
  };

  return (
    <div>
      <ThemeWrapper menu={"History"}>
        <SuccessMessage
          open={open}
          setOpen={setOpen}
          message={message}
          success={success}
        />
        {addHTMLModal && (
          <AddHTMLModal
            open={addHTMLModal}
            setOpen={setAddHTMLModal}
            btn={"Add"}
            heading={"Golf History"}
          />
        )}
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
          <UpdateHTMLModal
            open={openModal}
            setOpen={setOpenModal}
            aboutUsList={aboutUsList}
            filterListData={filterListData}
            btn={"Save"}
            heading={"Update Golf History"}
          />
        )}
        <div className="sm:mt-4">
          <Heading heading={"History"} />
        </div>

        {/* #aboutUsTable */}
        {aboutUsListData.length > 0 ? (
          <div className="mt-4 flow-root">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y  divide-gray-200">
                    <thead className="bg-[#34BE82]">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Image
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                        >
                          Title
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          HTML Description
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
                        {/* <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Delete
                      </th> */}
                      </tr>
                    </thead>
                    <tbody className="divide-y  divide-gray-200 bg-white">
                      {aboutUsListData?.map((person, index) => (
                        <tr key={index} className="">
                          <td className=" whitespace-pre-wrap   break-words px-3 py-4 text-sm text-black">
                            <img
                              src={person.image}
                              className="h-10 rounded-full"
                            />
                          </td>
                          <td className="whitespace-pre-wrap   break-words py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                            {person.Title}
                          </td>

                          <td className=" whitespace-pre-wrap  break-words px-3 py-4 text-sm text-black">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: person.HtmlDescription,
                              }}
                              className=" line-clamp-3"
                            />
                          </td>

                          {/* <td class="whitespace-pre-wrap   break-words px-3 py-4 text-sm ">
                          {person.IsLive === "1" ? (
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
                          <td class="whitespace-nowrap px-2 py-2 text-black">
                            <img
                              onClick={() => {
                                setOpenModal(true);
                                setFilterListData(person);
                              }}
                              src="/Icons/edit.png"
                              className="m-auto cursor-pointer h-8 w-8 transform hover:scale-110 transition duration-300 ease-in-out"
                            />
                          </td>
                          {/* <td class="whitespace-nowrap px-2 py-2 text-black">
                          <img
                            onClick={() => { setDeleteModal(true); setFilterListData(person); }}
                            src="/Icons/delete.png"
                            className="m-auto h-8 w-8  cursor-pointer filter-none grayscale opacity-100 hover:filterhover:grayscale-0 hover:opacity-70 transition duration-300 ease-in-out"
                          />
                        </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NoDataFound />
        )}
      </ThemeWrapper>
    </div>
  );
};

export default history;
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
