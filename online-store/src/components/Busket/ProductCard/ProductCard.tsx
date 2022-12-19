import React from 'react'
import './ProductCard.scss';
import { Response } from '../../../types/Response';


function ProductCard(props: {productData: Response}) {
  return (
    <div className='product-card'>
      <div className='list-number'>1</div>
      <img src={props.productData.thumbnail} className='product-image' alt={props.productData.title} />
      <ul className='product-card__info'>
        <li className='product-title'>{props.productData.brand} {props.productData.title}</li>
        <li className='product-description'>{props.productData.description}</li>
        <li className='product-rating'>Rating: {props.productData.rating}</li>
        <li className='product-discount'>Discount: {props.productData.discountPercentage}%</li>
      </ul>
      <ul className='quantity'>
        <li className='in-stock'>Available: {props.productData.stock} pcs</li>
        <li className='quantity-control'>
          <button className='decrease-button hoverOpacity'>
            <div className='minus-line'></div>
          </button>
          <span className='quantity-value'>100</span>
          <button className='increase-button hoverOpacity'></button>
        </li>
      </ul>
      <p className='price'>{props.productData.price}$</p>
    </div>
  )
}

export default ProductCard;