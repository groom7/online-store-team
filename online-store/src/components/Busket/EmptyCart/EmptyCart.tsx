import './EmptyCart.scss';
import cartIcon from './../../../assets/images/shopping-cart.png';
import { Link } from 'react-router-dom'

function EmptyCart() {
  return (
    <div className='empty-cart'>
      <img src={cartIcon} className='cart-icon' alt="cart-icon" />
      <span className='empty-cart-title'>You don't have any items in your cart. Let's get shopping!</span>
      <Link to='/' className='start-shopping-button button'>Start shopping</Link>
    </div>
  )
}

export default EmptyCart