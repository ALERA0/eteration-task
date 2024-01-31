import React, { useEffect, useState } from "react";
import RadioGroup from "../../components/RadioGroup/RadioGroup";
import CheckBoxGroup from "../../components/CheckBoxGroup/CheckBoxGroup";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductsByFilter } from "../../api";
import { DownOutlined } from "@ant-design/icons";

const HomePage = ({ searchValue }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [isSortVisible, setSortVisible] = useState(false);
  const [isBrandVisible, setIsBrandVisible] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);

  const handleSortClick = () => {
    setSortVisible(!isSortVisible);
    setIsBrandVisible(false);
    setIsModelVisible(false);
  };

  const handleBrandClick = () => {
    setSortVisible(false);
    setIsBrandVisible(!isBrandVisible);
    setIsModelVisible(false);
  };

  const handleModelClick = () => {
    setSortVisible(false);
    setIsBrandVisible(false);
    setIsModelVisible(!isModelVisible);
  };

  const { data: getAllProductsData } = useSelector(
    (state) => state.getAllProducts
  );

  const { data: getProductsByFilterData, status: getProductsByFilterStatus } =
    useSelector((state) => state.getProductsByFilter);
  console.log(sortBy, "sortBy");

  const sortProducts = (products) => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case 1: // Old to New
        sortedProducts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case 2: // New to Old
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case 3: // Price High to Low
        sortedProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        break;
      case 4: // Price Low to High
        sortedProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      default:
        break;
    }

    return sortedProducts;
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleFilterChange = async () => {
    const args = buildFilterQueryString();
    dispatch(getProductsByFilter({ args }));
  };

  const buildFilterQueryString = () => {
    const brandQuery =
      selectedBrands.length > 0
        ? `brand=${selectedBrands.join("&brand=")}`
        : "";
    const modelQuery =
      selectedModels.length > 0
        ? `&model=${selectedModels.join("&model=")}`
        : "";
    const searchQuery = searchValue ? `&name=${searchValue}` : "";
    return `${brandQuery}${modelQuery}${searchQuery}`;
  };

  useEffect(() => {
    console.log(selectedBrands, "selectedBrands");
    console.log(selectedModels, "selectedModels");
    handleFilterChange();
  }, [selectedBrands, selectedModels, searchValue, sortBy]);

  useEffect(() => {
    handleFilterChange();
  }, [currentPage]);

  const uniqueBrands = [
    ...new Set(getAllProductsData?.map((product) => product.brand)),
  ];
  const uniqueModels = [
    ...new Set(getAllProductsData?.map((product) => product.model)),
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedAndPaginatedItems =
    getProductsByFilterData && sortProducts(getProductsByFilterData);

  const currentItems =
    sortedAndPaginatedItems &&
    sortedAndPaginatedItems.slice(indexOfFirstItem, indexOfLastItem);

  const renderRowItems = (products) => {
    return products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const renderGridItems = () => {
    const items = [];
    const isMediumScreen = window.innerWidth <= 768;
  
    const itemsPerRow = isMediumScreen ? 2 : 4;
  
    for (let i = 0; i < currentItems.length; i += itemsPerRow) {
      const rowItems = currentItems.slice(i, i + itemsPerRow);
      const row = renderRowItems(rowItems);
      items.push(row);
    }
  
    return items;
  };
  
  


  return (
    <div className="lg:grid lg:grid-cols-10 flex flex-col gap-8 px-2 lg:px-0 h-full bg-[#F9F9F9]">
    {/*Mobile Filter Buttons */}
      <div className="lg:hidden grid  grid-cols-3">
        <div
          onClick={handleSortClick}
          className="flex cursor-pointer hover:bg-blue-600 duration-200 justify-center items-center gap-2 border-2 shadow-md bg-blue-500 text-white rounded-lg"
        >
          Sort By
          <DownOutlined />
        </div>
        <div
          onClick={handleBrandClick}
          className="flex justify-center items-center gap-2 border-2 shadow-md bg-blue-500 text-white rounded-lg"
        >
          Brands
          <DownOutlined />
        </div>
        <div
          onClick={handleModelClick}
          className="flex justify-center items-center gap-2 border-2 shadow-md bg-blue-500 text-white rounded-lg"
        >
          Models
          <DownOutlined />
        </div>
      </div>
      <div className="lg:col-span-2 hidden lg:flex flex-col gap-8">
        <RadioGroup
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        />
        <CheckBoxGroup
          text="Brands"
          options={uniqueBrands}
          selectedOptions={selectedBrands}
          onChange={(selectedOptions) => setSelectedBrands(selectedOptions)}
        />
        <CheckBoxGroup
          text="Model"
          options={uniqueModels}
          selectedOptions={selectedModels}
          onChange={(selectedOptions) => setSelectedModels(selectedOptions)}
        />
      </div>
      <div className=" md:col-span-8 col-span-10 grid grid-cols-4 h-full gap-2 justify-center">
        {getProductsByFilterStatus !== 200 ? (
          <p className="text-center  flex justify-center items-center col-span-6">
            Aradığınız kriterlere uygun ürün bulunamadı.
          </p>
        ) : (
          renderGridItems()
        )}
        <Pagination
          defaultCurrent={1}
          total={sortedAndPaginatedItems?.length}
          onChange={(page) => setCurrentPage(page)}
          className="w-full flex justify-center items-center mx-auto col-span-4 pb-8 pt-4"
        />
      </div>
      {/*Mobile Filter */}
      <div>
        {isSortVisible && (
          <div className="absolute 2xl:hidden left-4 top-32 z-10 duration-300 ease-in-out ">
            <RadioGroup
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
            />
          </div>
        )}
        {isBrandVisible && (
          <div className="absolute 2xl:hidden left-20 top-32 z-10 duration-300 ease-in-out ">
            <CheckBoxGroup
              options={uniqueBrands}
              selectedOptions={selectedBrands}
              onChange={(selectedOptions) => setSelectedBrands(selectedOptions)}
            />
          </div>
        )}
        {isModelVisible && (
          <div className="absolute 2xl:hidden right-4 top-32 z-10 duration-300 ease-in-out ">
            <CheckBoxGroup
              options={uniqueModels}
              selectedOptions={selectedModels}
              onChange={(selectedOptions) => setSelectedModels(selectedOptions)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
