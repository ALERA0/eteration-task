import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../api";
import { addToBasket } from "../../redux/slice/basket-slice";
import { useParams } from "react-router";

const ProductDetails = ({ productId }) => {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(productId ? productId : id));
  }, [dispatch, id, productId]);

  const handleBasketClick = () => {
    dispatch(addToBasket(getProductDetailsData));
  };

  const { data: getProductDetailsData } = useSelector(
    (state) => state.getProductDetails
  );

  

  return (
    <div className=" flex gap-8 h-full bg-[#F9F9F9]  w-full">
      {getProductDetailsData ? (
        <div className="md:grid md:grid-cols-2 flex flex-col w-full bg-white shadow-lg py-4 px-2 gap-4">
          <div
            className="bg-slate-500 w-full md:h-full bg-center bg-no-repeat bg-cover h-36"
            style={{
              backgroundImage: `url(${getProductDetailsData?.image})`,
              originX: 0,
              originY: 0,
            }}
          ></div>
          <div className="col-span-1 flex flex-col gap-8">
            <div>
              <h1 className="text-2xl ">{getProductDetailsData?.name}</h1>
              <p className="text-[#2A59FE] text-xl ">
                {getProductDetailsData?.price}
              </p>
            </div>
            <button
              onClick={handleBasketClick}
              className="bg-[#2A59FE] text-white py-2 w-full rounded-lg hover:bg-blue-500 duration-200"
            >
              Add to Cart
            </button>

            <p>{getProductDetailsData?.description}</p>
          </div>
        </div>
      ):<p>Aradığınız Ürün Bulunamadı</p>}
    </div>
  );
};

export default ProductDetails;
