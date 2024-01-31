// Header.jsx
import { InboxOutlined, QrcodeOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Basket from "../Basket/Basket";

const Header = ({ setSearchValue }) => {
  const { totalPrice } = useSelector((state) => state.basket);
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const toggleBasketVisibility = () => {
    setIsBasketVisible(!isBasketVisible);
    console.log(isBasketVisible)

  };

  return (
    <div className="grid lg:grid-cols-4 grid-cols-8 bg-[#2A59FE] 2xl:px-36 xl:px-20 lg:px-16 pl-1 pr-2 gap-1 py-3 ">
      <Link to="/" className="lg:col-span-1 col-span-2 text-white xl:text-3xl md:text-2xl text-lg hover:text-blue-900 duration-200 font-bold">
        Eteration
      </Link>
      <Search
        placeholder="Search"
        className="lg:col-span-1 col-span-4 my-auto bg-white rounded-lg"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="col-span-2 flex justify-end items-end gap-6">
        <div className=" lg:flex hidden text-white text-xl my-auto gap-1">
          <InboxOutlined />
          <p>{totalPrice.toFixed(2)} ₺</p>
        </div>
        <div className="flex  text-white text-xl my-auto gap-1">
          <UserOutlined />
          <p className="lg:flex hidden">User</p>
        </div>
        <div
          className="flex 2xl:hidden text-white text-xl my-auto gap-1 cursor-pointer hover:text-blue-950 duration-200"
          onClick={toggleBasketVisibility}
        >
        <ShoppingOutlined />
          <p className="lg:flex hidden">Basket</p>
        </div>
      </div>
      {isBasketVisible && <div className="absolute 2xl:hidden right-4 top-16 z-10 duration-300 ease-in-out "><Basket /></div>}
    </div>
  );
};

export default Header;
