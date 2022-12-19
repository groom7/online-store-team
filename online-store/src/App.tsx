import React from 'react';
import { useEffect, useState } from 'react';
import EmptyCart from './components/Busket/EmptyCart/EmptyCart';
import ProductCard from './components/Busket/ProductCard/ProductCard';
import ProductsInCart from './components/Busket/ProductsInCart/ProductsInCart';
import Products from './components/Main/Products/Products';
import { getAllProducts } from './controllers/getAllProducts';
import { setProducts } from './controllers/setProducts';
import Busket from './pages/Busket/Busket';

const productObj = {
  id:1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  images: ["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"]
}

function App() {
  const [loading, setLoading] = useState(true)
  const setProduct = () => {
    fetch('https://dummyjson.com/products?limit=100').then((data) => {
      data.json().then((product) => {
        setProducts(product.products);
      });
    }).then(() => {
      getAllProducts().length === 0 ? setProduct() : setLoading(false)
    }).catch((err) => {
      if(err) {
        return err
      }
    });
  }
  useEffect(() => {
    setProduct()
  }, []);
  return (
    // <div className="App">
    //   {loading ? <div>Loading please wait...</div> : (<Products />)}
    // </div>
  // (<EmptyCart />)
  // <ProductCard productData={ productObj } />
  <ProductsInCart productData={ productObj } />
  )
  
}

export default App;
