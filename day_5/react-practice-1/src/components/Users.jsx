import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Users = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      console.log("data", data);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Product ID: {product.id}</p>
          <p>Product Name: {product.title}</p>
          <img height={200} src={product.images} alt={product.title} />
          <p>Product Description: {product.description}</p>
          <p>Product Price: ${product.price}</p>
          <a href="">Buy Now</a>
        </div>
      )}
    </>
  );
};
export default Users;
