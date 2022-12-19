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
        <li className='in-stock'>Available: {props.productData.stock} pcs</li>
        <li className='quantity-control'>
          <button className='decrease-button'>
            <div className='minus-line'></div>
          </button>
          <span className='quantity-value'>XXX</span>
          <button className='increase-button'></button>
        </li>
      </ul>
      <p><span className='price'>{props.productData.price}$</span></p>
    </div>
  )
}

export default ProductCard;