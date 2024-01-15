import React, { useState } from "react";

const Dropdown = ({ data, label, dataHandler }) => {
  const [selectValue, setSelectValue] = useState("");
  const [select, setSelect] = useState(false);

  const dataChangeHandler = (datum) => {
    dataHandler && dataHandler(datum);
    setSelect(false);
    setSelectValue(datum);
  };

  return (
    <div className="mb-4">
      <div className=" relative">
        <p className="text-gray-600 text-sm mb-2 font-semibold">{label}</p>
        <div
          className="flex justify-end items-center px-3 h-11 bg-gray-50 focus:border focus:border-blue-900 rounded-md"
          onClick={() => {
            setSelect(!select);
          }}
        >
          <span className="flex grow text-gray-600">{selectValue}</span>
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition ${select ? "rotate-180" : "rotate-0"}`}
          >
            <path
              d="M8 10.5332L0 2.53317L1.86667 0.666504L8 6.79984L14.1333 0.666504L16 2.53317L8 10.5332Z"
              fill="#D2D5DA"
            />
            <path
              d="M8 10.5332L0 2.53317L1.86667 0.666504L8 6.79984L14.1333 0.666504L16 2.53317L8 10.5332Z"
              fill="black"
              fillOpacity="0.2"
            />
            <path
              d="M8 10.5332L0 2.53317L1.86667 0.666504L8 6.79984L14.1333 0.666504L16 2.53317L8 10.5332Z"
              fill="black"
              fillOpacity="0.2"
            />
          </svg>
        </div>

        <div
          className={`bg-white absolute z-10 left-0 right-0  transition-all duration-150 shadow-md ${
            select
              ? "max-h-[210px] h-auto overflow-y-auto border-lghtgry border border-t-transparent rounded-b"
              : "overflow-hidden border-transparent max-h-0"
          }`}
        >
          {data.map((datum, index) => (
            <p
              className={`text-gray-600 h-8 md:h-11 flex items-center px-6 hover:bg-dropdownHover transition-all duration-100 hover:bg-gray-50 ${
                selectValue === datum ? "bg-dropdown " : ""
              }`}
              key={index}
              onClick={() => {
                dataChangeHandler(datum);
              }}
            >
              {datum}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
