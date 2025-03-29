import { useEffect, useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await response.json();
    setData(result.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product List</h1>
      {loading ? (
        <h1 className="text-2xl text-gray-600">Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {data.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                className="w-full h-48 object-cover rounded-lg"
                src={product.images[0]}
                alt={product.title}
              />
              <h2 className="text-xl font-semibold mt-4 text-gray-700">{product.title}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">Price: ${product.price}</p>
              <a
                href={`/user/${product.id}`}
                className="text-white text-xl ">Buy</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
