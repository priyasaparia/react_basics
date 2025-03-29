import { useState, useEffect } from 'react'

import './App.css'

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function App() {
  const [product, setProduct] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetData = async () => {
    setLoading(true)
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
    console.log("data", data)
    setProduct(data)
    setLoading(false)
  }

  useEffect(() => {
    fetData()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {product.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "10px" }}>
              <img height={100} width={100} src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
