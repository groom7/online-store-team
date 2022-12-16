import React from 'react'
import Filters from '../../components/Main/Filters/Filters'
import Products from '../../components/Main/Products/Products'

function Main() {
  return (
    <div className='main__wrapper'>
      <Filters />
      <Products />
    </div>
  )
}

export default Main