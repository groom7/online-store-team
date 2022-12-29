import { useContext, useState, ChangeEvent, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import './ProductsInCart.scss';
import ProductCard from '../ProductCard/ProductCard';
import cartIcon from '../../../assets/images/shopping-cart.png';
import { StoreStateContext } from '../../../App';
import { createPagesNumbers } from './createPagesNumbers';

function ProductsInCart() {
  const { storeState } = useContext(StoreStateContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultStates = {
    currentPage: 
      Number(searchParams.get('currentPage')) 
      || +JSON.parse(localStorage.getItem('currentPage') || '1'),
    productsPerPageState: 
      Number(searchParams.get('productsPerPage'))
      || +JSON.parse(localStorage.getItem('perPageCount') || '3')
  };
  useEffect(() => {
    searchParams.set('productsPerPage', String(defaultStates.productsPerPageState));
    searchParams.set('currentPage', String(defaultStates.currentPage));
    setSearchParams(searchParams);
  }, []);
  const [currentPageState, setCurrentPageState] = useState(defaultStates.currentPage);
  const [productsPerPageState, setProductsPerPageState] = useState(defaultStates.productsPerPageState);
  const productsPagesCount = Math.ceil(storeState.state.busket.cartTotalCards / productsPerPageState);
  const pagesNumbers = createPagesNumbers(productsPagesCount, currentPageState);
  const handlePerPageValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setProductsPerPageState(defaultStates.productsPerPageState);
    } else {
      setProductsPerPageState(+event.target.value)
    }
    localStorage.setItem('perPageCount', event.target.value);
    searchParams.set('productsPerPage', event.target.value)
    setSearchParams(searchParams);
  }
  const handleCurrenPageCLick = (pageNumber: number) => {
    setCurrentPageState(pageNumber);
    localStorage.setItem('currentPage', String(pageNumber));
    searchParams.set('currentPage', String(pageNumber))
    setSearchParams(searchParams);
  };
  const productsOnPage = Object.values(storeState.state.busket.cartProductsData)
    .slice(
      (currentPageState - 1) * productsPerPageState,
      (currentPageState - 1) * productsPerPageState + productsPerPageState
    );
  if (productsOnPage.length === 0 ) {
    setCurrentPageState(currentPageState - 1);
    searchParams.set('currentPage', String(currentPageState - 1))
    setSearchParams(searchParams);
    localStorage.setItem('currentPage', String(currentPageState - 1));
  }
  
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
                onClick={ () => handleCurrenPageCLick(pageNumber) }
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
              onChange={ (event) => handlePerPageValueChange(event) }
              placeholder='count'
            />
          </div>
        </div>
      </div>
      <div className='products-list__cards'>
      { productsOnPage.map((item, index) => 
          <ProductCard
            productData={ item.identicalProducts[0] }
            groupTotalPrice={ item.groupTotalPrice }
            groupTotalCount={ item.groupTotalCount }
            listNumber={(currentPageState - 1) * productsPerPageState + index + 1}
            key={ window.crypto.randomUUID() }
          />
        )
      }
      </div>
    </div>
  )
}

export default ProductsInCart;