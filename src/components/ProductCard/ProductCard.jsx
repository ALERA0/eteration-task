// ProductCard.js
import React from "react";
import { motion } from "framer-motion";
import { addToBasket } from "../../redux/slice/basket-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBasketClick = () => {
    dispatch(addToBasket(product));
  };

  const handleClick = () => {
    // 'Add to Cart' butonuna tıklanırsa navigate yap
    navigate(`/${product.id}`);
  };

  return (
    <motion.div
      className="flex flex-col bg-white gap-2 p-2 shadow-lg cursor-pointer hover:shadow-2xl md:col-span-1 col-span-2"
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      onClick={(e) => {
        if (e.target.tagName !== "BUTTON") {
          handleClick();
        }
      }}
    >
      <motion.div
        className="bg-slate-500 w-full h-32 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${product.image})`,
          originX: 0,
          originY: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <p className="text-[#2A59FE]">{product.price} ₺</p>
      <p className="text-black truncate">{product.name}</p>
      
        <motion.button
          className="bg-[#2A59FE] text-white py-2 w-full rounded-lg hover:bg-blue-500 duration-200 "
          onClick={handleBasketClick}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          Add to Cart
        </motion.button>
      
    </motion.div>
  );
};

export default ProductCard;
