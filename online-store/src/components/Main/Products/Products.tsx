import React from 'react';
import { busketIsEmpty } from '../../../controllers/busketIsEmpty';
import { getAllBusketItems } from '../../../controllers/getAllBusketItems';
import { getAllProducts } from '../../../controllers/getAllProducts';
import { IPropsProduct } from '../../../types/Response';

const Products = ({displayProduct,hadleDelete,handleAddToBusket,select,handleSearch,search,inputPrice, category, brands, handleCheckBox}: IPropsProduct) => {
 
  const handleClick = () => {
    console.log(getAllBusketItems())
  }
  const tempHandleClick = () => {
    console.log(busketIsEmpty())
  }
  
 
  return (
   <div className='product__wrapper'>
   <div className='filter__container'>
   <input type="text" value={search} onChange={(e) => {handleSearch(e.target.value)}} />
   <div className='productFound'>Found: {getAllProducts().length}</div>
   <select value={select} onChange={(e) => {
    e.preventDefault()
    handleCheckBox('select', e.target.value)
    }}>
    <option value="" disabled>Sort options: </option>
    <option value="Sort-by-price-ASC">Sort by price ASC</option>
    <option value="Sort-by-price-DESC">Sort by price DESC</option>
    <option value="Sort-by-rating-ASC">Sort by rating ASC</option>
    <option value="Sort-by-rating-DESC">Sort by rating DESC</option>
    <option value="Sort-by-discount-ASC">Sort by discount ASC</option>
    <option value="Sort-by-discount-DESC">Sort by discount DESC</option>
   </select>
   <div onClick={() => {handleCheckBox('display', 'big')}}>big</div>
   <div onClick={() => {handleCheckBox('display', 'small')}}>small</div>
   </div>
    <div className={`block__container ${displayProduct ? 'small' : 'big'}`}>
      {getAllProducts().length === 0 ? <div>Product not found</div> : getAllProducts().map((item, i) => (
        <div className={`block__wrapper`} key={item.title}>
          <div>{item.title}</div>
          <div className='describtion'>
            <div>{item.category}</div>
            <div>{item.description}</div>
            <div>{item.price}$</div>
            <div>{item.discountPercentage}</div>
            <div>{item.rating}</div>
            <div>{item.stock}</div>
          </div>
          <img className='block__img' src={item.images[0]} alt="" />
          <button
            onClick={() => {
              handleAddToBusket(item);
            }}
          >
            add to busket
          </button>
          <button onClick={() => {hadleDelete(item)}}>Remove this</button>
        </div>
      ))}
     
    </div>
    <button onClick={() => {handleClick()}}>se all prodducts in busket</button>
    <button onClick={() => {tempHandleClick()}}>Is empty</button>
   </div>
  );
}

export default Products;
