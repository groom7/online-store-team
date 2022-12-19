import React from 'react'
import './ProductsInCart.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Response } from '../../../types/Response';
import cartIcon from './../../../assets/images/shopping-cart.png';

function ProductsInCart(props: { productData: Response }) {
  return (
    <div className='products-list'>
      <div className='products-list__header'>
        <img src={ cartIcon } className='cart-icon' alt="cart-icon" />
        <title className='cart-title'>Cart</title>
      </div>
      <div className='products-list__cards'>
        <ProductCard productData={ props.productData }/>
        <ProductCard productData={ props.productData }/>
        <ProductCard productData={ props.productData }/>
      </div>
    </div>


  )
}

export default ProductsInCart