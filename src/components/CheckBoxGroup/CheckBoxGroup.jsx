import { Checkbox } from "antd";
import Search from "antd/es/transfer/search";
import React, { useState, useEffect } from "react";

const CheckBoxGroup = ({ text, options, selectedOptions, onChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const [checkedOptions, setCheckedOptions] = useState([]);

  useEffect(() => {
    setCheckedOptions(selectedOptions);
  }, [selectedOptions]);

  const handleCheckboxChange = (option) => {
    const updatedOptions = [...checkedOptions];
    if (updatedOptions.includes(option)) {
      // Remove the option if it's already selected
      updatedOptions.splice(updatedOptions.indexOf(option), 1);
    } else {
      // Add the option if it's not selected
      updatedOptions.push(option);
    }
    setCheckedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  // Filtrelenmiş seçenekleri al
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <p className="text-[#333333B2] text-sm ">{text}</p>
      <div className="flex flex-col bg-[#FFFFFF] gap-2 py-3 px-4 shadow-lg h-36 ">
        <Search
          placeholder="Search"
          className="col-span-1 my-auto"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="overflow-auto div-with-scrollbar flex flex-col gap-2">
          {filteredOptions.map((option) => (
            <Checkbox
              key={option}
              value={option}
              checked={checkedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            >
              {option}
            </Checkbox>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckBoxGroup;
