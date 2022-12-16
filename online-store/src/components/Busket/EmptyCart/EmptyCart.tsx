import React from 'react'
import './EmptyCart.scss';

function EmptyCart() {
  return (
    <div className='empty-cart'>
      <img className='cart-icon' alt="cart-icon" />
      <span className='empty-cart-title'>Cart is empty</span>
    </div>
  )
}

export default EmptyCart