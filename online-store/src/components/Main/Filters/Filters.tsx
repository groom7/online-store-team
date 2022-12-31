import React, { useState } from 'react';
import { getAllBrands } from '../../../controllers/getAllBrands';
import { getAllCattegories } from '../../../controllers/getAllCategories';
import { resetFilters } from '../../../controllers/ResetFilters';
import { IPropsFilters } from '../../../types/Response';
import { getAllProducts } from '../../../controllers/getAllProducts';
import { getAllClearProducts } from '../../../controllers/getAllClearProducts';
import './filters.scss'
function Filters({inputPriceSecond,inputStockSecond,inputPrice, inputStock ,category, brands, handleCheckBox}: IPropsFilters) {
 const [copied, setCopied] = useState(false)
  const handleReset = () => {
    resetFilters()
    handleCheckBox('reset', '')
  }
  return (
    <div className="filters__wrapper">
      <div className="filters__up">
        <button onClick={handleReset}>Reset Filters</button>
        <button onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setCopied(true)
        }
          }>{copied ? 'Copied' : 'Copy Link'}</button>
      </div>
      <div className="filters__categories">
        Category
        <div className="filters__categories-container">
        {getAllCattegories().map((categories, i) => (
          <div className='filters__categories-wrapper' key={categories}>
            <div onClick={() =>{handleCheckBox('category', categories)}} className={category.includes(categories) ? 'active' : 'none-active'}></div>
            <span>{categories}</span>
            <div>{`(${getAllProducts().filter((item) => item.category === categories).length}/${getAllClearProducts().filter((item) => item.category === categories).length})`}</div>
          </div>
        ))}
        </div>
      </div>
      <div className="filters__brand">
        Brands
      <div className="filters__brands-container">
      {getAllBrands().map((brand, i) => (
          <div className='filters__brands-wrapper' key={brand}>
            <div onClick={() =>{handleCheckBox('brands', brand)}} className={brands.includes(brand) ? 'active' : 'none-active'}></div>
            <span>{brand}</span>
            <div>{`(${getAllProducts().filter((item) => item.brand === brand).length}/${getAllClearProducts().filter((item) => item.brand === brand).length})`}</div>
          </div>
        ))}
      </div>
      </div>
      <div className="filters__range">
        <div className="filters__range-price">
          price {inputPrice} ⟷ {inputPriceSecond}
        <div className="filters__range-wrapper">
        <input onChange={(e) => {handleCheckBox('price',+e.target.value)}} min={10} max={1749} value={inputPrice} type="range" name="" id="" />
        <input onChange={(e) => {handleCheckBox('price-2',+e.target.value)}} min={10} max={1749} value={inputPriceSecond} type="range" name="" id="" />
        </div>
        </div>
        <div className="filters__range-stock">
          stock {inputStock} ⟷ {inputStockSecond}
          <div className="filters__range-wrapper">
          <input onChange={(e) => {handleCheckBox('stock',+e.target.value)}} max={150} min={2} value={inputStock} type="range" name="" id="" />
          <input onChange={(e) => {handleCheckBox('stock-2',+e.target.value)}} min={2} max={150} value={inputStockSecond} type="range" name="" id="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
