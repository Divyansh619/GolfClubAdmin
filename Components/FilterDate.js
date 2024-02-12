import React from "react";

const FilterDate = ({ searchTerm, setSearchTerm, onSearch, onClick }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update the searchTerm as the user types
    onSearch(); // Trigger the search action with every change in searchTerm
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
 
  return (
    <div className="flex items-center justify-end mt-3">
      <input
        type="text"
        placeholder="Search by Club Name, Address, or Email"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#31572C] ml-2 w-80"
      />
      <button
        onClick={onSearch}
        
        className="bg-[#34BE82]   text-white font-semibold px-4 py-2 rounded-md ml-2 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default FilterDate;
