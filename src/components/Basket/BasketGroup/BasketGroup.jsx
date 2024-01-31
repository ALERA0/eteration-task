import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../../redux/slice/basket-slice";

const BasketGroup = ({ item }) => {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    dispatch(removeFromBasket(item));
  };

  const handleIncrease = () => {
    dispatch(addToBasket(item));
  };

  return (
    <div className="flex w-full gap-2">
      <div className="flex flex-col w-full">
        <p className="text-black text-sm truncate w-full">{item.name}</p>
        <p className="text-[#2A59FE] text-xs ">{item.price} ₺</p>
      </div>
      <div className="flex w-full justify-end">
        <button
          className="w-6  py-1 text-lg font-bold bg-slate-200 hover:bg-slate-300 duration-200 text-black my-auto"
          onClick={handleDecrease}
        >
          -
        </button>
        <p className="bg-[#2A59FE] px-2 w-9 text-white flex justify-center items-center">
          {item.quantity}
        </p>
        <button
          className="py-1 w-6 x text-lg font-bold bg-slate-200 hover:bg-slate-300 duration-200 text-black"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default BasketGroup;
