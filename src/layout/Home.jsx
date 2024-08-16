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
      {/* sorting */}
      <div className="sort-options flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-1 mb-4 ml-2">
        <button
          className="w-full sm:w-auto sm:px-1 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => handleSortChange("price", "asc")}
        >
          Price: Low to High
        </button>
        <button
          className="w-full sm:w-auto sm:px-1 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => handleSortChange("price", "desc")}
        >
          Price: High to Low
        </button>
        <button
          className="w-full sm:w-auto sm:px-1 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => handleSortChange("createdAt", "desc")}
        >
          Date: Newest First
        </button>
        <button
          className="w-full sm:w-auto sm:px-1 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => handleSortChange("createdAt", "asc")}
        >
          Date: Oldest First
        </button>
      </div>

      {/* oroduct cards */}
      <div className="grid gap-5 px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
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
