import React, { useContext } from 'react';
import { getAllProducts } from '../../../controllers/getAllProducts';
import { IPropsProduct } from '../../../types/Response';
import { Link } from 'react-router-dom';
import { StoreStateContext } from '../../../App';
import { isItemInCart } from '../../../controllers/isItemInCart';
import './product.scss'
const Products = ({displayProduct,select,handleSearch,search, handleCheckBox}: IPropsProduct) => {
const {setCartProduct, removeCartProduct} = useContext(StoreStateContext)
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
      {getAllProducts().length === 0 ? <div className='product-not-found'>Product not found</div> : getAllProducts().map((item, i) => (
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
          {isItemInCart(item) ? <button onClick={() => {removeCartProduct(item)}}>Remove this</button> : <button onClick={() => {setCartProduct(item);}}>add to busket</button>}
          <Link  to={`product-details/${item.id}`}>Details</Link>
        </div>
      ))}
    </div>
   </div>
  );
}

export default Products;
