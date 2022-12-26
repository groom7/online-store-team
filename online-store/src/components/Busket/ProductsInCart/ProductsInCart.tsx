import React, { useContext, useState } from 'react'
import './ProductsInCart.scss';
import ProductCard from '../ProductCard/ProductCard';
import cartIcon from '../../../assets/images/shopping-cart.png';
import xIcon from '../../../assets/images/x.png';
import { StoreStateContext } from '../../../App';
import { createPagesNumbers } from './createPagesNumbers';

function ProductsInCart() {
  const { storeState } = useContext(StoreStateContext);
  const defaultStates = {
    currentPage: 1,
    productsPerPageState: 1
  };
  const [currentPageState, setCurrentPageState] = useState(defaultStates.currentPage);
  const [productsPerPageState, setProductsPerPageState] = useState(defaultStates.productsPerPageState);
  const productsPagesCount = Math.ceil(storeState.state.busket.cartTotalCards / productsPerPageState);
  const pagesNumbers = createPagesNumbers(productsPagesCount, currentPageState);
  const productsOnPage = Object.values(storeState.state.busket.cartProductsData)
    .slice(
      (currentPageState - 1) * productsPerPageState,
      (currentPageState - 1) * productsPerPageState + productsPerPageState
    );
  if (productsOnPage.length === 0 ) setCurrentPageState(currentPageState - 1);
  
  return (
    <div className='products-list'>
      <div className='products-list__header'>
        <div className='cart-title-container'>
          <img src={ cartIcon } className='cart-icon' alt="cart-icon" />
          <title className='cart-title'>Shopping cart</title>
        </div>
        <div className='pagination-control'>
          <div className='pages-numbers'>
            <span>Pages:</span>
            { pagesNumbers.map((pageNumber: number) => 
              <span
                className={ 
                  pageNumber === currentPageState 
                  ? 'page-number bold-orange-text'
                  : 'page-number'
                } 
                key={ window.crypto.randomUUID() }
                onClick={ () => setCurrentPageState(pageNumber) }
              >
                { pageNumber }
              </span> 
            )}
          </div>
          <div className='items-per-page'>
            <span className='items-per-page__title'>Items per page:</span>
            <input
              className='items-per-page__input'
              type="number"
              defaultValue={ defaultStates.productsPerPageState }
              onChange={ (event) => setProductsPerPageState(+event.target.value) }
              placeholder='count'
            />
          </div>
        </div>
      </div>
      <div className='products-list__cards'>
      { productsOnPage.map(item => 
          <ProductCard
            productData={ item.identicalProducts[0] }
            groupTotalPrice={ item.groupTotalPrice }
            groupTotalCount={ item.groupTotalCount }
            key={ item.title }
          />
        )
      }
      </div>
    </div>
  )
}

export default ProductsInCart