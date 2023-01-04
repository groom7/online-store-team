import { useContext, useState, ChangeEvent, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ProductsInCart.scss';
import ProductCard from '../ProductCard/ProductCard';
import cartIcon from '../../../assets/images/shopping-cart.png';
import { StoreStateContext } from '../../../App';
import { createPagesNumbers } from './createPagesNumbers';

function ProductsInCart() {
  const { storeState } = useContext(StoreStateContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const isGetSearchParams = useRef(false); 
  let actualCurrentPage = 1;
  let actualProductsPerPageValue = 3;
  const [currentPageState, setCurrentPageState] = useState(actualCurrentPage);
  const [productsPerPageState, setProductsPerPageState] = useState(actualProductsPerPageValue);
  useEffect(() => {
    for(var key of searchParams.keys()) {
      if (String(key) !== 'productsPerPage' || String(key) !== 'currentPage') {
        setSearchParams({});
        break;
      }
    }
    const searchParamCurrentPage = searchParams.get('currentPage');
    if (searchParamCurrentPage && +searchParamCurrentPage > 0) {
      actualCurrentPage = +searchParamCurrentPage;
      setCurrentPageState(actualCurrentPage);
    }
    const searchParamProductsPerPage = searchParams.get('productsPerPage');
    if (searchParamProductsPerPage && +searchParamProductsPerPage > 0) {
      actualProductsPerPageValue = +searchParamProductsPerPage;
      setProductsPerPageState(actualProductsPerPageValue);
    }
    
    isGetSearchParams.current = true;
  }, []);
  
  useEffect(() => {
    if (!isGetSearchParams.current) {
      searchParams.set('currentPage', String(currentPageState));
      searchParams.set('productsPerPage', String(productsPerPageState));
      setSearchParams(searchParams);
    }
    isGetSearchParams.current = false;
  }, [currentPageState, productsPerPageState]);
  const productsPagesCount = Math.ceil(storeState.state.busket.cartTotalCards / productsPerPageState);
  const pagesNumbers = createPagesNumbers(productsPagesCount, currentPageState);
  const handlePerPageValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const productsPerPageValue = event.target.value;
    if ((/^[1-9][0-9]*$/).test(productsPerPageValue)) {
      setProductsPerPageState(+productsPerPageValue);
    }
  }
  const handleCurrenPageCLick = (pageNumber: number) => {
    setCurrentPageState(pageNumber);
  };
  const productsOnPage = Object.values(storeState.state.busket.cartProductsData)
    .slice(
      (currentPageState - 1) * productsPerPageState,
      (currentPageState - 1) * productsPerPageState + productsPerPageState
    );
  if (productsOnPage.length === 0 ) {
    setCurrentPageState(currentPageState - 1);
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
              value={ productsPerPageState }
              onChange={ (event) => handlePerPageValueChange(event) }
              onFocus={ (event) => event.target.select() }
              placeholder='count'
              min={1}
              
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