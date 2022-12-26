import React, { useEffect, useState } from 'react';
import Filters from '../../components/Main/Filters/Filters';
import Products from '../../components/Main/Products/Products';
import '../../styles/scss/MainPage/mainPage.scss';
import { addFilters } from '../../controllers/addFilter';
import { setProducts } from '../../controllers/setProducts';
import { getAllProducts } from '../../controllers/getAllProducts';
import { Response } from '../../types/Response';
import { addSelectOption } from '../../controllers/addSelectOption';
import Header from '../../components/Header/Header';
import { addToBusket } from '../../controllers/addToBusket';
import { removeFromBusket } from '../../controllers/removeFromBusket';
import { changeDisplayStyle } from '../../controllers/changeDisplayStyle';
function Main() {
  const [loading, setLoading] = useState(true);
  const setProduct = () => {
    fetch('https://dummyjson.com/products?limit=100')
      .then((data) => {
        data.json().then((product) => {
          setProducts(product.products);
        });
      })
      .then(() => {
        getAllProducts().length === 0 ? setProduct() : setLoading(false);
      })
      .catch((err) => {
        if (err) {
          return err;
        }
      });
  };
  useEffect(() => {
    setProduct();
  }, []);

  const [category, setCategory] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [inputPrice, setInputPrice] = useState<number>(1);
  const [inputPriceSecond, setInputPriceSecond] = useState<number>(1749);
  const [inputStock, setInputStock] = useState<number>(2);
  const [inputStockSecond, setInputStockSecond] = useState<number>(150);
  const [search, setSearch] = useState<string>('');
  const [select, setSelect] = useState<string>('');
  const [busket, setBusket] = useState<Response[]>([]);
  const [displayProduct, setDisplayProduct] = useState(false);
  const handleCheckBox = (type: string, payload: string | number) => {
    if (type === 'select' && typeof payload === 'string') {
      setSelect(payload);
      addSelectOption(payload);
    }
    if (type === 'reset') {
      setInputPrice(1);
      setInputStock(2);
      setInputStockSecond(150);
      setInputPriceSecond(1749);
      setBrands([]);
      setCategory([]);
      setSearch('');
      setSelect('');
    } else {
      addFilters(type, payload);
    }
    if (type === 'category' && typeof payload === 'string') {
      if (category.includes(payload)) {
        setCategory(category.filter((item) => item !== payload));
      } else {
        setCategory(category.concat(payload));
      }
    }
    if (type === 'brands' && typeof payload === 'string') {
      if (brands.includes(payload)) {
        setBrands(brands.filter((item) => item !== payload));
      } else {
        setBrands(brands.concat(payload));
      }
    }
    if(getAllProducts().length !== 0 && typeof payload !== 'number') {
      let minPrice = getAllProducts().reduce((item1, item2) => item1.price < item2.price ? item1 : item2)
    setInputPrice(minPrice.price)
    let maxPrice = getAllProducts().reduce((item1, item2) => item1.price > item2.price ? item1 : item2)
    setInputPriceSecond(maxPrice.price)
    let minStock = getAllProducts().reduce((item1, item2) => item1.stock < item2.stock ? item1 : item2)
    setInputStock(minStock.stock)
    let maxStock = getAllProducts().reduce((item1, item2) => item1.stock > item2.stock ? item1 : item2)
    setInputStockSecond(maxStock.stock)
    }
    if (type === 'price' && typeof payload === 'number') {
      setInputPrice(payload);
    }
    if (type === 'price-2' && typeof payload === 'number') {
      setInputPriceSecond(payload);
    }
    if (type === 'stock-2' && typeof payload === 'number') {
      setInputStockSecond(payload);
    }
    if (type === 'stock' && typeof payload === 'number') {
      setInputStock(payload);
    }
    if (type === 'display') {
      if (payload === 'small') {
        changeDisplayStyle('small');
        setDisplayProduct(true);
      } else {
        changeDisplayStyle('big');
        setDisplayProduct(false);
      }
    }
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    addFilters('search', searchValue);
  };
  const handleAddToBusket = (item: Response) => {
    addToBusket(item);
    setBusket(busket.concat(item));
  };
  const hadleDelete = (item: Response) => {
    removeFromBusket(item);
    let mustBeRemoved = busket.find((items) => items === item);
    if (mustBeRemoved !== undefined) {
      let index = busket.indexOf(mustBeRemoved);
      busket.splice(index, 1);
      setBusket([...busket]);
    }
  };
  return (
    <div className="main">
      <Header busket={busket} />
      <div className="main__wrapper">
        <Filters
          inputPriceSecond={inputPriceSecond}
          inputStockSecond={inputStockSecond}
          category={category}
          brands={brands}
          handleCheckBox={handleCheckBox}
          inputStock={inputStock}
          inputPrice={inputPrice}
        />
        {loading ? (
          <div>Loading please wait...</div>
        ) : (
          <Products
            displayProduct={displayProduct}
            hadleDelete={hadleDelete}
            handleAddToBusket={handleAddToBusket}
            select={select}
            handleSearch={handleSearch}
            search={search}
            category={category}
            inputPrice={inputPrice}
            inputStock={inputStock}
            brands={brands}
            handleCheckBox={handleCheckBox}
          />
        )}
      </div>
    </div>
  );
}

export default Main;
