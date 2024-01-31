import { Radio, Space } from "antd";
import React from "react";

const RadioGroup = ({ value, onChange }) => {
  return (
    <div className="flex flex-col">
      <p className="text-[#333333B2] text-sm hidden lg:flex ">Sort By</p>
      <div className="shadow-lg flex-col p-4 bg-[#FFFFFF]  ">
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Old to new</Radio>
            <Radio value={2}>New to old</Radio>
            <Radio value={3}>Price hight to low</Radio>
            <Radio value={4}>Price low to High</Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default RadioGroup;
