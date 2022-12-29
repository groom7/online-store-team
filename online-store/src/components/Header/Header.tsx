import React from 'react'
import '../../styles/scss/HeaderPage/header.scss'
import { HeaderProps } from '../../types/Response'
import { Link } from 'react-router-dom'
import { getAllBusketItemsLength } from '../../controllers/getAllBusketItemsLength'

function Header({busket}: HeaderProps) {
  return (
    <div className='header__wrapper'>
      <Link to='/' className='logo'>🛍 Online store</Link>
      <div className='card__total'>Card total: </div>

      <Link to='/busket' className='header__busket'>
        <img className='header__busket-img' src="https://online-store-rs.netlify.app/assets/cart.png" alt="" />
        <div className='header__busket-count'>
          {busket.length === 0 ? getAllBusketItemsLength() : busket.length}
        </div>

      </Link>
    </div>
  )
}

export default Header