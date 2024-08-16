import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

function Home() {
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((res) => setProducts(res.data));
  }, []);
  return (
    <>
   <div className="grid gap-5 px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
   {
        products.map((p)=><Card 
        key={p._id}
        product={p}
        >hi
        </Card>)
    }
   </div>
    </>
  );
}

export default Home;
