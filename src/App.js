// App.js
import React, { useState } from "react";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Basket from "./components/Basket/Basket";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const params = useParams();
  const productId = params?.id;

  const NotFound = () => {
    return <h2>404 - Sayfa Bulunamadı</h2>;
  };

  return (
    <div className="flex flex-col bg-[#F9F9F9] h-full w-full ">
      <Header setSearchValue={setSearchValue} />
      <div className="grid grid-cols-10 py-8 2xl:px-36 xl:px-20 lg:px-10 gap-8">
        <div className="2xl:col-span-8 col-span-10">
          <Routes>
            <Route path="/" element={<HomePage searchValue={searchValue} />} />
            <Route path="/productDetails/:id" element={<ProductDetails productId={productId} />} />
             <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className="2xl:col-span-2 hidden 2xl:flex">
          <Basket />
        </div>
      </div>
    </div>
  );
}

export default App;
