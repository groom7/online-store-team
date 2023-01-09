import { useContext } from 'react'
import './ProductCard.scss';
import { Response } from '../../../types/Response';
import { StoreStateContext } from '../../../App';
import { Link } from 'react-router-dom';

function ProductCard(
  props: {
    productData: Response,
    groupTotalPrice: number,
    groupTotalCount: number 
    listNumber: number,
  } ) {
  const { setCartProduct, removeCartProduct } = useContext(StoreStateContext);
  const handleProductIncrease = () => {
    if (props.groupTotalCount < props.productData.stock) {
      setCartProduct(props.productData)
    } else {
      alert('Reached maximum available products count');
    }
  }
  return (
    <div className='product-card'>
      <div className='list-number'>{props.listNumber}</div>
      <Link className='item-details-page-link' to={`/product-details/${props.productData.id}`}>
        <div className="item-image__wrapper">
          <div className="item-image__helper">
            <img
              loading='lazy'
              className='item-image__img'
              src={props.productData.thumbnail}
              alt="item thumbnail"
            />
          </div>
        </div>
      </Link>
      <Link className='item-details-page-link' to={`/product-details/${props.productData.id}`}>
        <ul className='product-card__info'>
          <li className='product-title'>{props.productData.brand} {props.productData.title}</li>
          <li className='product-description'>{props.productData.description}</li>
          <li className='product-category'>Category: {props.productData.category}</li>
          <li className='product-rating'>Rating: {props.productData.rating}</li>
          <li className='product-discount'>Discount: {props.productData.discountPercentage}%</li>
        </ul>
      </Link>
      <ul className='quantity'>
        <li className='in-stock'>Available: { props.productData.stock } pcs</li>
        <li className='quantity-control'>
          <button
            className='decrease-button button hoverOrange'
            onClick={ () => removeCartProduct(props.productData) }>
          </button>
          <span className='quantity-value'>{ props.groupTotalCount }</span>
          <button 
            className='increase-button button hoverOrange'
            onClick={ handleProductIncrease }
          >
          </button>
        </li>
      </ul>
      <p className='price'>${ props.groupTotalPrice }</p>
    </div>
  )
}

export default ProductCard;