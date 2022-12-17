import React from 'react'
import './ProductCard.scss';
import { Response } from '../../../types/Response';


function ProductCard(props: {productData: Response}) {
  return (
    <div className='product-card'>
      <div className='list-number'></div>
      <img src={props.productData.thumbnail} className='product-image' alt={props.productData.title} />
      <ul product-card__info>
        <li className='product-title'>{props.productData.brand} {props.productData.title}</li>
        <li className='product-description'>{props.productData.description}</li>
        <li className='product-rating'>Rating: {props.productData.rating}</li>
        <li className='product-discount'>Discount: {props.productData.discountPercentage}%</li>
      </ul>
      <ul className='quantity'>
        <li className='in-stock'>In stock: {props.productData.stock}</li>
        <li className='quantity-control'>
          <button className='decrease-button'>
            {/* <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/>
            </svg> */}
            <div className='minus-line'></div>
          </button>
          <span className='quantity-value'>XXX</span>
          <button className='increase-button'>
            <div className='plus-horizontal-line'></div>
            <div className='plus-vertical-line'></div>
          </button>
        </li>
      </ul>
      <span className='price'>{props.productData.price}$</span>
    </div>
  )
}

export default ProductCard;