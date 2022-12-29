import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAllClearProducts } from '../../controllers/getAllClearProducts'
import { getProductById } from '../../controllers/getProductById'
import { addToBusket } from '../../controllers/addToBusket'
import './Details.scss'
interface DetailsProps {
  loading: boolean
}
function Details({loading} : DetailsProps) {
  const currentId = +(window.location.href.split('/')[window.location.href.split('/').length - 1])
  const [currentImg, setCurrentImg] = useState('')
  useEffect(() => {
    !loading ? setCurrentImg(getProductById(currentId).images[0]) : setCurrentImg('')
  }, [])
  return (
  <>
  {loading ? <div>Loading...</div> : <><Link to={'/'}>store</Link>{`>>${getProductById(currentId).category}>>${getProductById(currentId).brand}>>${getProductById(currentId).title}`}
  <div className='details__wrapper'>
    <div className='details__title'>{getProductById(currentId).title}</div>
    <div className='details__bottom'>
      <div className='details__bottom-images'>
        {}
          {Array.from(new Set(getProductById(currentId).images)).map((item) => (
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
        <button>ADD TO CART</button>
        <Link onClick={() => {addToBusket(getProductById(currentId))}} to={'/busket'}>BUY NOW</Link>
      </div>
    </div>

  </div></>}
  </>
  )
}

export default Details