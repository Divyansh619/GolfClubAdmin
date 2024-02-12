import Heading from "@/Components/Heading";
import AddHTMLModal from "@/Components/Modals/AddHTMLModal";
import DeleteModal from "@/Components/Modals/DeleteModal";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import SuccessModal from "@/Components/Modals/SuccessModal";
import Addtestimonial from "@/Components/Modals/Addtestimonial";
import UpdateTestimonialModal from "@/Components/Modals/UpdateTestimonialModal";
import NoDataFound from "@/Components/NoDataFound";
import ThemeWrapper from "@/Components/ThemeWrapper";
import React from "react";
import { useEffect, useRef, useState } from "react";
import PaginationComp from "@/Components/PaginationComp";
import { useRouter } from "next/router";

const testimonials = () => {
  const [openModal, setOpenModal] = useState(false);
  const [addHTMLModal, setAddHTMLModal] = useState(false);
  const [filterListData, setFilterListData] = useState([]);
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [testimonialsListData, setTestimonialsListData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [totalDataCount, setTotalCount] = useState(0);
  const { query } = useRouter();
  const pageNumber = query.page;
  const maxPages = Math.ceil(totalDataCount / 20);

  useEffect(() => {
    testimonialsList(pageNumber);
  }, [pageNumber]);

  const testimonialsList = (page) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      page: page || 1,
      content: 20,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/AdminTestimonialList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setTestimonialsListData(result.data);
          setTotalCount(result.count);
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
      TestimonialUUID: filterListData.TestimonialUUID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/TestmonialDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setMessage("Testimonial details deleted successfully!!");
          testimonialsList();
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
      .catch((error) => {
        console.log("error", error);
        setMessage("Something went wrong. Please contact support!!");
        setSuccess(false);
        setOpen(true);
        setDeleteModal(false);
      })
      .finally(() => {
        setLoading("");
      });
  };

  return (
    <div>
      <ThemeWrapper menu={"Testimonials"}>
        <SuccessMessage
          open={open}
          setOpen={setOpen}
          message={message}
          success={success}
        />
        {addHTMLModal && (
          <Addtestimonial
            open={addHTMLModal}
            setOpen={setAddHTMLModal}
            btn={"Add"}
            heading={"HTML Description"}
            testimonialsList={testimonialsList}
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
          <UpdateTestimonialModal
            open={openModal}
            setOpen={setOpenModal}
            testimonialsList={testimonialsList}
            filterListData={filterListData}
            btn={"Save"}
            heading={"Testimonials Description"}
          />
        )}

        {/* <Heading heading={"Testimonials"} />

        <div className="flex justify-between items-center mt-2">
     
        <div>
          <button
            onClick={() => setAddHTMLModal(true)}
            className="bg-[#34BE82] my-1 text-white font-semibold px-4 py-2 rounded-md   focus:outline-none"
          >
            Add New Testimonial
          </button>
        </div>
      </div> */}

        <div className="sm:flex sm:items-center sm:mt-4">
          <div className="sm:flex-auto">
            <Heading heading={"Testimonials"} />
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setAddHTMLModal(true)}
              className="block rounded-md bg-[#34BE82] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Add New Testimonials
            </button>
          </div>
        </div>

        {/* #aboutUsTable */}
        {testimonialsListData.length > 0 ? (
          <div className="mt-4 flow-root">
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
                          Testimonial
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y  divide-gray-200 bg-white">
                      {testimonialsListData?.map((item, index) => (
                        <tr key={index} className="">
                          <td className="whitespace-pre-wrap   break-words py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                            {item.MemberName}
                          </td>
                          <td className=" whitespace-pre-wrap  break-words px-3 py-4 text-sm text-black">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.Testimonial,
                              }}
                              className=" line-clamp-3"
                            />
                          </td>

                          <td class="whitespace-pre-wrap   break-words px-3 py-4 text-sm ">
                            {item.IsLive === "1" ? (
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
                          </td>
                          <td class="whitespace-nowrap px-2 py-2 text-black">
                            <img
                              onClick={() => {
                                setOpenModal(true);
                                setFilterListData(item);
                              }}
                              src="/Icons/edit.png"
                              className="m-auto cursor-pointer h-8 w-8 transform hover:scale-110 transition duration-300 ease-in-out"
                            />
                          </td>
                          <td class="whitespace-nowrap px-2 py-2 text-black">
                            <img
                              onClick={() => {
                                setDeleteModal(true);
                                setFilterListData(item);
                              }}
                              src="/Icons/delete.png"
                              className="m-auto h-6  cursor-pointer filter-none grayscale opacity-100 hover:filterhover:grayscale-0 hover:opacity-70 transition duration-300 ease-in-out"
                            />
                          </td>
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
        {maxPages > 1 ? (
          <PaginationComp
            pageNumber={pageNumber}
            maxPages={maxPages}
            pageUrl={"testimonials"}
          />
        ) : (
          <></>
        )}
      </ThemeWrapper>
    </div>
  );
};

export default testimonials;

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
