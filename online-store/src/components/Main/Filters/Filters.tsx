import React from 'react';
import { getAllBrands } from '../../../controllers/getAllBrands';
import { getAllCattegories } from '../../../controllers/getAllCategories';
import { resetFilters } from '../../../controllers/ResetFilters';
import '../../../styles/scss/MainPage/filters.scss'
import { IPropsMainPage } from '../../../types/Response';
function Filters(props: IPropsMainPage) {
const {category = [], brands = [], handleCheckBox} = props
  return (
    <div className="filters__wrapper">
      <div className="filters__up">
        <button onClick={resetFilters}>Reset Filters</button>
        <button>Copy Link</button>
      </div>
      <div className="filters__categories">
        Category
        {getAllCattegories().map((categories, i) => (
          <div key={i}>
            <div className={category.includes(categories) ? 'active' : ''}></div>
            <input onClick={() =>{handleCheckBox('category', categories)}} type="checkbox" />
            <span>{categories}</span>
          </div>
        ))}
      </div>
      <div className="filters__brand">
        Brands
        {getAllBrands().map((brand, i) => (
          <div key={i + 1}>
            <div className={brands.includes(brand) ? 'active' : ''}></div>
            <input onClick={() =>{handleCheckBox('brands', brand)}} type="checkbox" />
            <span>{brand}</span>
          </div>
        ))}
      </div>
      <div className="filters__range">
        <div className="filters__range-price">
          price
        <input type="range" name="" id="" />
        </div>
        <div className="filters__range-stock">
          stock
          <input type="range" name="" id="" />
        </div>
      </div>
    </div>
  );
}

export default Filters;
