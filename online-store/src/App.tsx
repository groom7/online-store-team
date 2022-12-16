import React from 'react';
import { useEffect, useState } from 'react';
import { getAllProducts } from './controllers/getAllProducts';
import { setProducts } from './controllers/setProducts';
import Busket from './pages/Busket/Busket';
import Main from './pages/Main/Main';
function App() {
  const [loading, setLoading] = useState(true)
  const setProduct = () => {
    fetch('https://dummyjson.com/products?limit=100').then((data) => {
      data.json().then((product) => {
        setProducts(product.products);
      });
    }).then(() => {
      getAllProducts().length === 0 ? setProduct() : setLoading(false)
    }).catch((err) =>   {
      if(err) {
        return err
      }
    });
  }
  useEffect(() => {
    setProduct()
  }, []);
  return (
    <div className="App">
      {loading ? <div>Loading please wait...</div> : (<Main />)}
    </div>
  )
}

export default App;
