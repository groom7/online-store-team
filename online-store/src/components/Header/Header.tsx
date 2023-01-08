import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreStateContext } from '../../App';
import './Header.scss'
import cartIcon from '../../assets/images/shopping-cart.png'

function Header() {
  const { storeState } = useContext(StoreStateContext);
  
  return (
    <header className='header'>
      <div className='outer-wrapper'>
        <div className="header-container">
          <Link to='/' className='header__logo'>Online store</Link>
          <Link to='/busket' className='header__cart button' data-testid='header__cart'>
            <div className='cart-totals'>
              <span className='count'>{ storeState.state.busket.cartTotalCount } pcs</span>
              <span className='grand-total'>${ storeState.state.busket.cartGrandTotal }</span>
            </div>
            <img src={ cartIcon } className='cart-icon hoverOrange' alt="cart-icon" />
          </Link>
          </div>
      </div>
    </header>
  )
}

export default Header;