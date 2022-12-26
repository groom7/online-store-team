import React from 'react';
import { getAllBrands } from '../../../controllers/getAllBrands';
import { getAllCattegories } from '../../../controllers/getAllCategories';
import { resetFilters } from '../../../controllers/ResetFilters';
import '../../../styles/scss/MainPage/filters.scss'
import { IPropsFilters } from '../../../types/Response';
import { getAllProducts } from '../../../controllers/getAllProducts';
import { getAllClearProducts } from '../../../controllers/getAllClearProducts';
function Filters({inputPriceSecond,inputStockSecond,inputPrice, inputStock ,category, brands, handleCheckBox}: IPropsFilters) {
 
  const handleReset = () => {
    resetFilters()
    handleCheckBox('reset', '')
  }
 
  return (
    <div className="filters__wrapper">
      <div className="filters__up">
        <button onClick={handleReset}>Reset Filters</button>
        <button>Copy Link</button>
      </div>
      <div className="filters__categories">
        Category
        {getAllCattegories().map((categories, i) => (
          <div key={categories}>
            <div className={category.includes(categories) ? 'active' : ''}></div>
            <input onClick={() =>{handleCheckBox('category', categories)}} type="checkbox" />
            <span>{categories}</span>
            <div>{`(${getAllProducts().filter((item) => item.category === categories).length}/${getAllClearProducts().filter((item) => item.category === categories).length})`}</div>
          </div>
        ))}
      </div>
      <div className="filters__brand">
        Brands
        {getAllBrands().map((brand, i) => (
          <div key={brand}>
            <div className={brands.includes(brand) ? 'active' : ''}></div>
            <input onClick={() =>{handleCheckBox('brands', brand)}} type="checkbox" />
            <span>{brand}</span>
            <div>{`(${getAllProducts().filter((item) => item.brand === brand).length}/${getAllClearProducts().filter((item) => item.brand === brand).length})`}</div>
          </div>
        ))}
      </div>
      <div className="filters__range">
        <div className="filters__range-price">
          price {inputPrice} {'<'}==={'>'} {inputPriceSecond}
        <input onChange={(e) => {handleCheckBox('price',+e.target.value)}} min={10} max={1749} value={inputPrice} type="range" name="" id="" />
        <input onChange={(e) => {handleCheckBox('price-2',+e.target.value)}} min={10} max={1749} value={inputPriceSecond} type="range" name="" id="" />
        </div>
        <div className="filters__range-stock">
          stock {inputStock} {'<'}==={'>'} {inputStockSecond}
          <input onChange={(e) => {handleCheckBox('stock',+e.target.value)}} max={150} min={2} value={inputStock} type="range" name="" id="" />
          <input onChange={(e) => {handleCheckBox('stock-2',+e.target.value)}} min={2} max={150} value={inputStockSecond} type="range" name="" id="" />
        </div>
      </div>
    </div>
  );
}

export default Filters;
