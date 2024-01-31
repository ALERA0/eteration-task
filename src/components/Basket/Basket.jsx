import React, { useState, useEffect } from 'react';
import BasketGroup from './BasketGroup/BasketGroup';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotalPrice } from '../../redux/slice/basket-slice';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const storedBasket = localStorage.getItem('basket');
  const dispatch = useDispatch();

  const { items: basket ,totalPrice} = useSelector(
    (state) => state.basket
  );

  useEffect(() => {
    // localStorage'dan veriyi al
    if (storedBasket) {
      setBasketItems(JSON.parse(storedBasket));
    }

    // Toplam fiyatı hesapla
    dispatch(calculateTotalPrice());
  }, [storedBasket, basket]);



  return (
    <div className="w-full ">
      <div className="bg-white shadow-lg gap-3 flex flex-col p-2 max-h-36 md:max-h-52 div-with-scrollbar   overflow-auto">
        {basketItems.map((item) => (
          <BasketGroup key={item.id} item={item} />
        ))}
      </div>
      <div className="bg-white shadow-lg flex flex-col px-2 py-4 md:mt-4 mt-1 gap-4">
        <div className="w-full flex gap-2">
          <p className="text-black text-lg">Total Price: </p>
          <p className="text-[#2A59FE] text-lg font-bold">
            {totalPrice.toFixed(2)} ₺
          </p>
        </div>
        <button className="bg-[#2A59FE] text-white py-2 w-full rounded-lg hover:bg-blue-500 duration-200 ">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Basket;
