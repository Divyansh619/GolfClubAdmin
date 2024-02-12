import FilterDate from "@/Components/FilterDate";
import Heading from "@/Components/Heading";
import CarouselModal from "@/Components/Modals/CarouselModal";
import DeleteModal from "@/Components/Modals/DeleteModal";
import SuccessMessage from "@/Components/Modals/SuccessMessage";
import NoDataFound from "@/Components/NoDataFound";
import ThemeWrapper from "@/Components/ThemeWrapper";
import React, { useEffect, useRef, useState } from "react";

const Banners = () => {
  const [bannerListApiData, setBannerListApiData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [addClubModal, setAddClubModal] = useState(false);
  const [getId, setgetId] = useState("");

  const [carouselDesktopImage, setCarouselDesktopImage] = useState("");
  const [sno, setSno] = useState(1);
  const [carouselMobileImage, setCarouselMobileImage] = useState("");
  const [carouselSection, setCarouselSection] = useState("");
  const [isLive, setIsLive] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputMobile = useRef(null);
  const fileInputDesktop = useRef(null);

  const allowedFileTypes = [
    "image/jpg",
    "image/svg+xml",
    "image/webp",
    "image/jpeg",
    "image/png",
  ];

  const handleFileChange = (fileInput, event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      // Valid file type, update state or perform other actions
      if (fileInput === "mobile") {
        setCarouselMobileImage(event.target.files);
        // Update mobile file input state
      } else if (fileInput === "desktop") {
        // Update desktop file input state
        setCarouselDesktopImage(event.target.files);
      }
    } else {
      alert("Invalid file type. Please select a valid image file.");
    }
  };

  useEffect(() => {
    BannerListApi();
  }, []);

  const BannerListApi = () => {
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

    fetch("https://stgadmin.sasone.in/api/LGCadmin/BannerList", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setBannerListApiData(result.data);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error));
  };

  //   #InsertApi
  const insertBanner = () => {
    setLoading("insert");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );

    var formdata = new FormData();
    formdata.append("SNo", sno);
    formdata.append("BannerSection", carouselSection);
    formdata.append("BannerImageMobile", carouselMobileImage);
    formdata.append("BannerImageDesktop", carouselDesktopImage);

    formdata.append("isLive", isLive ? 1 : 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/BannerInsert",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          //   setBannerListApiData(result.data);
          setSno("");
          setCarouselSection("");
          setMessage("Banner Inserted Successfully!!");
          setSuccess(true);
          setOpen(true);
          setAddClubModal(false);
          BannerListApi();
        } else {
          setSno("");
          setCarouselSection("");
          setMessage("Something went wrong.Please contact support!!");
          setSuccess(false);
          setOpen(true);
          setAddClubModal(false);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  };

  //   Delete
  const deleteBannerApi = () => {
    setLoading("delete");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 1435a113995b2c25c2376646e271312f1873a674"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      BannerUUID: getId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://stgadmin.sasone.in/api/LGCadmin/BannerDelete",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          BannerListApi();
          setDeleteModal(false);
        } else console.log("Error");
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ThemeWrapper menu={"Banners"}>
      <SuccessMessage
        open={open}
        setOpen={setOpen}
        message={message}
        success={success}
      />
      {openModal && (
        <CarouselModal
          open={openModal}
          setOpen={setOpenModal}
          heading={"Update Carousel"}
          btn={"Save"}
        />
      )}
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          loading={loading}
          setOpen={setDeleteModal}
          functionDelete={deleteBannerApi}
        />
      )}
      {addClubModal && (
        <CarouselModal
          open={addClubModal}
          setOpen={setAddClubModal}
          heading={"Add Carousel"}
          btn={"Submit"}
          setCarouselSection={setCarouselSection}
          setCarouselMobileImage={setCarouselMobileImage}
          setSno={setSno}
          setCarouselDesktopImage={setCarouselDesktopImage}
          sno={sno}
          loading={loading}
          carouselDesktopImage={carouselDesktopImage}
          carouselMobileImage={carouselMobileImage}
          carouselSection={carouselSection}
          isLive={isLive}
          setIsLive={setIsLive}
          handleFileChange={handleFileChange}
          functionApi={insertBanner}
          fileInputMobile={fileInputMobile}
          fileInputDesktop={fileInputDesktop}
        />
      )}
      <div className="px-4 my-3 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <Heading heading={"Banners"} />
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setAddClubModal(true)}
              className="block rounded-md bg-[#34BE82] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Add New Banner
            </button>
          </div>
        </div>

        <div className="mt-2 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                {bannerListApiData.length > 0 ? (
                  <table className="min-w-full divide-y  divide-gray-200">
                    <thead className="bg-[#34BE82]">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                        >
                          Section
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Banner Desktop
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Banner Mobile
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Status
                        </th>
                        {/* <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th> */}
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {bannerListApiData?.map((person, index) => (
                        <tr key={index}>
                          <td className="whitespace-pre-wrap   break-words py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-6">
                            {person.BannerSection}
                          </td>
                          <td className="whitespace-pre-wrap break-words px-3 py-4 text-sm text-black">
                            <img
                              src={person.BannerImageDesktop}
                              alt={`Banner ${person.BannerImageAltTag}`}
                              className="w-20 h-10 rounded-md"
                            />
                          </td>
                          <td className="whitespace-pre-wrap break-words px-3 py-4 text-sm text-black">
                            <img
                              src={person.BannerImageMobile}
                              alt={`Banner ${person.BannerImageAltTag}`}
                              className="w-20 h-10 rounded-md"
                            />
                          </td>

                          <td class="whitespace-pre-wrap   break-words px-3 py-4 text-sm ">
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
                          </td>
                          {/* <td className="relative   py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div
                            onClick={() => {
                              setOpenModal(true);
                            }}
                            className="text-[#34BE82] cursor-pointer "
                          >
                            Edit
                          </div>
                        </td> */}
                          <td className="relative   py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div
                              onClick={() => {
                                setDeleteModal(true);
                                setgetId(person.BannerUUID);
                              }}
                              className="text-[#34BE82] cursor-pointer "
                            >
                              Delete
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <NoDataFound />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
};

export default Banners;
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
