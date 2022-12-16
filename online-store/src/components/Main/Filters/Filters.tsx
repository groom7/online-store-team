import React from 'react';
import { getAllBrands } from '../../../controllers/getAllBrands';
import { getAllCattegories } from '../../../controllers/getAllCategories';
function Filters() {
  return (
    <div className="filters__wrapper">
      <div className="filters__up">
        <button>Reset Filters</button>
        <button>Copy Link</button>
      </div>
      <div className="filters__categories">
        Category
        {getAllCattegories().map((categories) => (
          <div>
            <input type="checkbox" />
            <span>{categories}</span>
          </div>
        ))}
      </div>
      <div className="filters__brand">
        Brands
        {getAllBrands().map((brand) => (
          <div>
            <input type="checkbox" />
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
