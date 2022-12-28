import { useContext } from 'react'
import '../../styles/scss/HeaderPage/header.scss'
import { Link } from 'react-router-dom'
import { StoreStateContext } from '../../App';
import './Header.scss'

function Header() {
  const { storeState } = useContext(StoreStateContext);
  
  return (
    <div className='header__wrapper'>
      <Link to='/' className='logo'>Online store</Link>
      <div className='card__total'>Card total: { storeState.state.busket.cartGrandTotal }</div>

      <Link to='/busket' className='header__busket'>
        <img className='header__busket-img' src="https://online-store-rs.netlify.app/assets/cart.png" alt="" />
        <div className='header__busket-count'>
          { storeState.state.busket.cartTotalCount }
        </div>

      </Link>
    </div>
  )
}

export default Header