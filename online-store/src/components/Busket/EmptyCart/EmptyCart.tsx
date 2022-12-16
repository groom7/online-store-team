import React from 'react'
import './EmptyCart.scss';
import cartIcon from './../../../assets/images/shopping-cart.png';

function EmptyCart() {
  return (
    <div className='empty-cart'>
      <img src={cartIcon} className='cart-icon' alt="cart-icon" />
      <span className='empty-cart-title'>Cart is empty</span>
    </div>
  )
}

export default EmptyCart