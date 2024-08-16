import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

function Home() {
  const [products, setProducts] = useState([]);
  console.log(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/product?page=${currentPage}&limit=10&sortField=${sortField}&sortOrder=${sortOrder}`
      )
      .then((res) => {
        // setProducts(res.data)
        setProducts(res.data.products), setTotalPages(res.data.totalPages);
      });
  }, [currentPage, sortField, sortOrder]);
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
  return (
    <>
 {/* Filtering Options */}
 <div className="flex flex-wrap justify-center gap-4 mb-8">
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Sportswear</option>
                    <option value="Books">Home Appliances</option>
                </select>

                <select
                    onChange={(e) => setBrand(e.target.value)}
                    value={brand}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">All Brands</option>
                    <option value="BrandA">TechBrand</option>
                    <option value="BrandB"> SoundMaster</option>
                    <option value="BrandB"> GigaTech</option>
                    <option value="BrandB"> RunMaster</option>
                    <option value="BrandB"> FitFlex</option>
                </select>

                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                />

                <button
                    onClick={() => setCurrentPage(1)}
                    className="p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
                >
                    Apply Filters
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
    </>
  );
}

export default Home;
