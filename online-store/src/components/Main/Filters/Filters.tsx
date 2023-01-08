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
      <div className="filters-control">
        <h3 className='filter-block-title'>Control</h3>
        <button className='filters-reset-button button hoverBgcOrange' onClick={handleReset}>Reset Filters</button>
        <button
          className='link-copy-button button hoverBgcOrange'
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
            }
          }
        >
          {copied ? 'Link copied' : 'Copy page link'}
        </button>
      </div>
      <div className="filters__categories">
        <h3 className='filter-block-title'>Category</h3>
        <div className="filters__categories-container">
          {getAllCattegories().map((categories, i) => (
            <div className='filters__categories-wrapper' key={categories}>
              <div onClick={() =>{handleCheckBox('category', categories)}} className={`filter-checkbox ${category.includes(categories) ? 'active' : 'none-active'}`}></div>
              <p className='filter-text'>
                {categories}
                <span className='filter-text__items-count'>{`(${getAllProducts().filter((item) => item.category === categories).length}/${getAllClearProducts().filter((item) => item.category === categories).length})`}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <h3 className='filter-block-title'>Brands</h3>
      <div className="filters__brand">
      <div className="filters__brands-container">
      {getAllBrands().map((brand, i) => (
          <div className='filters__brands-wrapper' key={brand}>
            <div onClick={() =>{handleCheckBox('brands', brand)}} className={`filter-checkbox ${brands.includes(brand) ? 'active' : 'none-active'}`}></div>
            <p className='filter-text'>
              {brand}
              <span className='filter-text__items-count'>{`(${getAllProducts().filter((item) => item.brand === brand).length}/${getAllClearProducts().filter((item) => item.brand === brand).length})`}</span>
            </p>
          </div>
        ))}
      </div>
      </div>
      <div className="filters__range">
        <div className="filters__range-price">
        <h4 className='filter-price-subtitle'>Price</h4>
        <span className='filter-range-value'>{Math.min(inputPrice, inputPriceSecond)} ⟷ {Math.max(inputPrice, inputPriceSecond)}</span>
          <div className="filters__range-wrapper">
            <input className="filters__range-min" onChange={(e) => {handleCheckBox('price',+e.target.value)}} min={10} max={1749} value={inputPrice} type="range" name="" id="" />
            <input className="filters__range-max" onChange={(e) => {handleCheckBox('price-2',+e.target.value)}} min={10} max={1749} value={inputPriceSecond} type="range" name="" id="" />
          </div>
        </div>
        <div className="filters__range-stock">
          <h4 className='filter-stock-subtitle'>Stock</h4>
          <span className='filter-range-value'>{Math.min(inputStock, inputStockSecond)} ⟷ {Math.max(inputStock, inputStockSecond)}</span>
          <div className="filters__range-wrapper">
            <input className="filters__range-min" onChange={(e) => {handleCheckBox('stock',+e.target.value)}} max={150} min={2} value={inputStock} type="range" name="" id="" />
            <input className="filters__range-max" onChange={(e) => {handleCheckBox('stock-2',+e.target.value)}} min={2} max={150} value={inputStockSecond} type="range" name="" id="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
