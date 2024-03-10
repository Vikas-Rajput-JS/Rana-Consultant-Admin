import React from "react";

const Html = ({ searchText, search, placeholder, id }) => {
  return (
    <>
      <input
        compoment="GooglePlaceAutoComplete"
        type="text"
        id={"pac_input_" + id}
        value={searchText}
        placeholder={placeholder || ""}
        onChange={(e) => search(e.target.value)}
        className="w-full animation duration-200 px-4 py-2.5 text-base bg-[#1a2040] text-white font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
      />
    </>
  );
};

export default Html;
