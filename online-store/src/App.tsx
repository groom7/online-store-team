import React from 'react';
import { useEffect, useState, createContext } from 'react';
import Products from './components/Main/Products/Products';
import { addToBusket } from './controllers/addToBusket';
import { getAllProducts } from './controllers/getAllProducts';
import { removeFromBusket } from './controllers/removeFromBusket';
import { setProducts } from './controllers/setProducts';
import Busket from './pages/Busket/Busket';
import { store } from './store/store';
import { Response, Store } from './types/Response';
import Main from './pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
export interface StoreContext {
  storeState: Store;
  setCartProduct: (productData: Response) => void
  removeCartProduct: (productData: Response) => void
}

export const StoreStateContext = createContext<StoreContext>({
  storeState: store,
  setCartProduct: () => {},
  removeCartProduct: () => {},
});


function App() {
  const [storeState, setStore] = useState(store);
  const setCartProduct = (productData: Response) => {
    addToBusket(productData);
    setStore({
      ...store,
    });
  };
  const removeCartProduct = (productData: Response) => {
    removeFromBusket(productData);
    setStore({
      ...store,
    });
  };
  
  const [loading, setLoading] = useState(true);
  
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
    <StoreStateContext.Provider value={{ storeState, setCartProduct, removeCartProduct }}>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/busket' element={<Busket />} />
      </Routes>
    </StoreStateContext.Provider>
  )
}

export default App;
