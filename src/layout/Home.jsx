import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "./../provider/AuthProvider";

function Home() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  console.log(products);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/product", {
        params: {
          page: currentPage,
          limit: 10,
          sortField,
          sortOrder,
          category,
          brand,
          minPrice,
          maxPrice,
          search: searchTerm,
        },
      })
      .then((res) => {
        // setProducts(res.data)
        setProducts(res.data.products), setTotalPages(res.data.totalPages);
      });
  }, [
    currentPage,
    searchTerm,
    sortField,
    sortOrder,
    category,
    brand,
    minPrice,
    maxPrice,
  ]);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };
  const curren = () => {
    setCurrentPage(1);
  };
  return (
    <>
      {!user ? (
        <h1 className="text-center mt-5 font-bold text-2xl text-red-500">Login First</h1>
      ) : (
        <div>
          {/* Filtering Options */}

          <div className="flex flex-wrap justify-start md:justify-center gap-1 md:gap-3 mb-8 mt-5 px-4">
            <div>
              <label htmlFor="select" className="font-bold">
                Category:{" "}
              </label>
              <select
                typeof="select"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="p-2 border border-gray-300 rounded-md shadow-sm outline-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Sportswear">Sportswear</option>
                <option value="Home Appliances">Home Appliances</option>
              </select>
            </div>

            <div>
              <label htmlFor="select" className="font-bold">
                Brands:{" "}
              </label>
              <select
                typeof="select"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                className="p-2 border border-gray-300 rounded-md shadow-sm outline-blue-500"
              >
                <option value="">All Brands</option>
                <option value="TechBrand">TechBrand</option>
                <option value="SoundMaster"> SoundMaster</option>
                <option value="GigaTech"> GigaTech</option>
                <option value="RunMaster"> RunMaster</option>
                <option value="FitFlex"> FitFlex</option>
              </select>
            </div>

            <div>
              <label htmlFor="number" className="font-bold">
                Min.Price:{" "}
              </label>
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="p-2 border border-gray-300 outline-blue-500 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="number" className="font-bold">
                Max.Price:{" "}
              </label>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="p-2 border border-gray-300 rounded-md shadow-sm outline-blue-500"
              />
            </div>

            <button
              onClick={curren}
              className="p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
            >
              Apply Filters
            </button>
          </div>
          {/* Search Input */}
          <div className="w-full  flex items-center justify-between px-2">
            <div className="flex justify-start w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 outline-blue-500 rounded-md shadow-sm w-full md:w-1/2"
              />
              <button className=" hidden md:btn md:text-white md:bg-blue-500">
                <FaSearch />
                Search
              </button>
            </div>
            {/* sorting */}
            <div className="sort-options ml-2">
              <select
                className=" px-4 py-2  bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                onChange={(e) => {
                  const [sortField, sortOrder] = e.target.value.split(",");
                  handleSortChange(sortField, sortOrder);
                }}
              >
                <option value="price,asc">Price: Low to High</option>
                <option value="price,desc">Price: High to Low</option>
                <option value="createdAt,desc">Date: Newest First</option>
                <option value="createdAt,asc">Date: Oldest First</option>
              </select>
            </div>
          </div>

          {/* oroduct cards */}
          <div className="grid md:gap-5 px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {products.map((p) => (
              <Card key={p._id} product={p}>
                hi
              </Card>
            ))}
          </div>
          {/* paiginations */}
          <div className="pagination text-center my-3 space-x-2">
            <button
              className="btn btn-primary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
