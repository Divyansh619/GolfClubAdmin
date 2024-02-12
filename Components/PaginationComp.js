

const PaginationComp = (props) => {
  const pageNumber = props.pageNumber
  const maxPages = props.maxPages
  const paginationArray = Array(maxPages).fill(0);
  const pageUrl = props.pageUrl;

  return (
    <div className="flex items-center justify-between  bg-white  py-3 mt-4">
      <div className="flex flex-1 justify-center gap-4 sm:hidden">
        <a href={(pageNumber == 2 || pageNumber == null) ? `${pageUrl}` : `${pageUrl}?page=${Number(pageNumber) - 1}`}
          onClick={pageNumber == null ? (e) => e.preventDefault() : console.log()}
          className={pageNumber == null ? "relative inline-flex w-[80px] text-center justify-center items-center rounded-md border cursor-text border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-2" : "relative inline-flex items-center rounded-md w-[80px] text-center justify-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium hover:bg-gray-50 focus:z-2"}>
          <span className="">Previous</span>

        </a>
        <a href={pageNumber == null ? `${pageUrl}?page=2` : pageNumber == maxPages ? `${pageUrl}?page=${maxPages}` : `${pageUrl}?page=${Number(pageNumber) + 1}`}
          onClick={pageNumber == maxPages ? (e) => e.preventDefault() : console.log()}
          className={pageNumber == maxPages ? "relative inline-flex w-[80px] text-center justify-center items-center rounded-md border cursor-text border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-2" : "relative inline-flex items-center rounded-md w-[80px] text-center justify-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium  hover:bg-gray-50 focus:z-2"}>
          <span className="">Next</span>
        </a>

      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a href={(pageNumber == 2 || pageNumber == null) ? `${pageUrl}` : `${pageUrl}?page=${Number(pageNumber) - 1}`}
              onClick={pageNumber == null ? (e) => e.preventDefault() : console.log()}
              className={pageNumber == null ? "relative inline-flex items-center rounded-l-md border cursor-text border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-2" : "relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium hover:bg-gray-50 focus:z-2"}>
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </a>
            {
              paginationArray?.map((page, index) => {
                return (<div key={index} className={pageNumber >= 5 ? (pageNumber == maxPages ? (index >= pageNumber - 5 && index <= pageNumber ? "" : "hidden") : (index >= pageNumber - 4 && index <= pageNumber ? "" : "hidden")) : (index >= 0 && index < 5) ? "" : "hidden"}>
                  <a href={index + 1 == 1 ? `${pageUrl}` : `${pageUrl}?page=${index + 1}`} aria-current="page"
                    onClick={pageNumber == index + 1 || (pageNumber == null && index + 1 == 1) ? (e) => e.preventDefault() : console.log()}
                    className={pageNumber == index + 1 || (pageNumber == null && index + 1 == 1) ? "relative z-10 inline-flex items-center border cursor-text px-4 py-2 text-sm font-medium border-[#34BE82] bg-sky-50 text-[#34BE82] focus:z-20" : "relative  inline-flex items-center border  px-4 py-2 text-sm font-medium hover:bg-sky-100 border-gray-300 focus:z-20"}>{index + 1}</a>
                </div>)
              })
            }

            <a href={pageNumber == null ? `${pageUrl}?page=2` : pageNumber == maxPages ? `${pageUrl}?page=${maxPages}` : `${pageUrl}?page=${Number(pageNumber) + 1}`}
              onClick={pageNumber == maxPages ? (e) => e.preventDefault() : console.log()}
              className={pageNumber == maxPages ? "relative inline-flex items-center rounded-r-md border cursor-text border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-2" : "relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium  hover:bg-gray-50 focus:z-2"}>
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default PaginationComp;