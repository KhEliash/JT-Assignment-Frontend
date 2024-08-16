function Card({ product }) {
  const { category, name, image, price, ratings, description, createdAt } =
    product;
  return (
    <>
      <div className="w-full h-96 sm:w-full sm:h-100 md:w-full md:h-112 lg:w-full lg:h-128 rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 m-5 flex flex-col">
        <div className="h-40">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="product"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
            <p className="text-sm text-gray-500 mb-1">Category: {category}</p>
            <p className="text-xs text-gray-400 mb-3">
              Created At: {createdAt}
            </p>
            <p className="text-gray-700">{description}</p>
          </div>
          <div className="flex justify-between items-center ">
            <p className="text-lg font-bold text-green-600">${price}</p>
            <p className="text-yellow-500 font-semibold">⭐ {ratings}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
