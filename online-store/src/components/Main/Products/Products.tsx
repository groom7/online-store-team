import { useContext } from 'react';
import { getAllProducts } from '../../../controllers/getAllProducts';
import { IPropsProduct } from '../../../types/Response';
import { Link } from 'react-router-dom';
import { StoreStateContext } from '../../../App';
import { isItemInCart } from '../../../controllers/isItemInCart';
import './product.scss'
import squaresIcon from '../../../assets/images/squares.png'
import listIcon from '../../../assets/images/list.png'
import { useInfiniteScroll } from '../../../customHooks/useInfiniteScroll';

const Products = ({displayProduct,select,handleSearch,search, handleCheckBox, loading}: IPropsProduct) => {
const {setCartProduct, removeCartProduct} = useContext(StoreStateContext)
const count = useInfiniteScroll()
  return (
    <div className='product__wrapper'>
      <div className='filter__container'>
        <input className='items-search-input input' type="text" value={search} onChange={(e) => {handleSearch(e.target.value)}} placeholder='Input search text'/>
        <div className='productFound'>Found items: {getAllProducts().length}</div>
        <select className='select' value={select} onChange={(e) => {
          e.preventDefault()
          handleCheckBox('select', e.target.value)
          }}>
          <option value="" disabled>Sort options: </option>
          <option value="Sort-by-price-ASC">Sort by price ASC</option>
          <option value="Sort-by-price-DESC">Sort by price DESC</option>
          <option value="Sort-by-rating-ASC">Sort by rating ASC</option>
          <option value="Sort-by-rating-DESC">Sort by rating DESC</option>
          <option value="Sort-by-discount-ASC">Sort by discount ASC</option>
          <option value="Sort-by-discount-DESC">Sort by discount DESC</option>
        </select>
        <div className='view-control'>
          <span>View:</span>
          <button className='view-type-button button hoverOrange' onClick={() => {handleCheckBox('display', 'squares-view')}}>
            <img className="view-type-button__icon" src={squaresIcon} alt="squares" />
          </button>
          <button className='view-type-button button hoverOrange' onClick={() => {handleCheckBox('display', 'list-view')}}>
            <img className="view-type-button__icon" src={listIcon} alt="list" />
          </button>
          </div>
      </div>
      {loading ? <div className='product-not-found'></div> : <div className={`item-card-container ${displayProduct ? 'list-view' : 'squares-view'}`}>
        {getAllProducts().length === 0 
          ? <div>Product not found</div> 
          : getAllProducts().slice(0, count).map((item, i) => (
          <div className={`item-card-container__item-card ${displayProduct ? 'item-card-list-view' : 'item-card-squares-view'}`} key={item.title}>
            <Link className='item-details-page-link' to={`product-details/${item.id}`}>
              <div className="item-image__wrapper">
                <div className="item-image__helper">
                  <img loading='lazy' className='item-image__img' src={item.images[0]} alt="item thumbnail" />
                </div>
              </div>
            </Link>
            <Link className='item-details-page-link' to={`product-details/${item.id}`}>
              <div className='item-info'>
                <p className='item-info__title'>{item.title}</p>
                <span className='item-info__price'>${item.price}</span>
                <span className='item-info__category'>{item.category}</span>
                <p className='item-info__discountPercentage'>Discount: {item.discountPercentage}%</p>
                <span className='item-info__rating'>Rating: {item.rating}</span>
                <span className='item-info__stock'>Available: {item.stock} pcs</span>
              </div>
            </Link>
            {isItemInCart(item)
              ? <button className='item-buy-button button' onClick={() => {removeCartProduct(item)}}>Remove this</button>
              : <button className='item-buy-button button' onClick={() => {setCartProduct(item);}}>Add to cart</button>
            }
          </div>
        ))}
      </div>}
    </div>
  );
}

export default Products;
