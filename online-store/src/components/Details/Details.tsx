import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductById } from '../../controllers/getProductById'
import { addToBusket } from '../../controllers/addToBusket'
import './Details.scss'
import { StoreStateContext } from '../../App'
import { isItemInCart } from '../../controllers/isItemInCart'
import { DetailsProps } from '../../types/Response'


function DetailsComponent({loading, setModalActive} : DetailsProps) {
  const { setCartProduct, removeCartProduct } = useContext(StoreStateContext);
  const currentId = +(window.location.href.split('/')[window.location.href.split('/').length - 1])
  const [currentImg, setCurrentImg] = useState('')
  useEffect(() => {
    !loading ? setCurrentImg(getProductById(currentId).images[0]) : setCurrentImg('')
  }, [])
  const linkHandler = () => {
    !isItemInCart(getProductById(currentId)) ? addToBusket(getProductById(currentId)) : console.log()
    setModalActive(true)
  }
  return (
  <>
  {loading ? <div>Loading...</div> : <><Link to={'/'}>store</Link>{`>>${getProductById(currentId).category}>>${getProductById(currentId).brand}>>${getProductById(currentId).title}`}
  <div className='details__wrapper'>
    <div className='details__title'>{getProductById(currentId).title}</div>
    <div className='details__bottom'>
      <div className='details__bottom-images'>
          {Array.from(new Set(currentId === 1 ? (getProductById(currentId).images.length !== 3 ? getProductById(currentId).images.splice(0, 2) : getProductById(currentId).images) : getProductById(currentId).images)).map((item) => (
            <div key={item} onClick={() => {setCurrentImg(item)}}><img className='details__bottom-img-item' src={item} alt="" /></div>
          ))}
      </div>
      <div className='details__bottom-img'>
            <img src={currentImg} alt="" />
      </div>
      <div className='details__bottom-describtion'>
            <div className='details__bottom-describtion'>
              <div className="details__describtion-up">
              Description:
              </div>
              <div className="details__describtion-bottom">
                {getProductById(currentId).description}
              </div>
            </div>

            <div className='details__bottom-describtion'>
              <div className="details__discount-up">
              Discount Percentage:
              </div>
              <div className="details__discount-bottom">
                {getProductById(currentId).discountPercentage}
              </div>
            </div>

            <div className='details__bottom-describtion'>
              <div className="details__rating-up">
              Rating:
              </div>
              <div className="details__rating-bottom">
                {getProductById(currentId).rating}
              </div>
            </div>

            <div className='details__bottom-describtion'>
              <div className="details__stock-up">
              Stock:
              </div>
              <div className="details__stock-bottom">
                {getProductById(currentId).stock}
              </div>
            </div>

            <div className='details__bottom-describtion'>
              <div className="details__brand-up">
              Brand:
              </div>
              <div className="details__brand-bottom">
                {getProductById(currentId).brand}
              </div>
            </div>

            <div className='details__bottom-describtion'>
              <div className="details__category-up">
              Category:
              </div>
              <div className="details__category-bottom">
                {getProductById(currentId).category}
              </div>
            </div>
      </div>
      <div className='details__bottom-buttons'>
        {getProductById(currentId).price}
        {isItemInCart(getProductById(currentId)) ? <button onClick={() => {removeCartProduct(getProductById(currentId))}}>Remove this</button> : <button onClick={() => {setCartProduct(getProductById(currentId));}}>add to busket</button>}
        <Link  onClick={() => {linkHandler()}} to={'/busket'}>BUY NOW</Link>
      </div>
    </div>

  </div></>}
  </>
  )
}

export default DetailsComponent