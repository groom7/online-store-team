import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProductById } from '../../controllers/getProductById'
import { addToBusket } from '../../controllers/addToBusket'
import './Details.scss'
import { StoreStateContext } from '../../App'
import { isItemInCart } from '../../controllers/isItemInCart'
import { DetailsProps } from '../../types/Response'

function DetailsComponent({loading, setModalActive} : DetailsProps) {
  const navigate = useNavigate();
  const { setCartProduct, removeCartProduct } = useContext(StoreStateContext);
  const currentId = +(window.location.href.split('/')[window.location.href.split('/').length - 1])
  const uniqPict = () => {
    if(currentId === 1) {
      if(getProductById(currentId).images.length !== 3) {
       return getProductById(currentId).images.splice(0, 2)
      }else {
       return getProductById(currentId).images
      }
    }else if(currentId === 10) {
      if(getProductById(currentId).images.length !== 3) {
        let res = getProductById(currentId).images
         res.splice(0, 1)
         return res
      }else {
        return getProductById(currentId).images
      }
    }else if(currentId === 20) {
      if(getProductById(currentId).images.length !== 4) {
        let res = getProductById(currentId).images
        res.splice(2, 1)
        return res
      }else {
        return getProductById(currentId).images
      }
    }else {
      return getProductById(currentId).images
    }
  }
 const [whatDisplay, setWhatDisplay] = useState('details')
 const [currentImg, setCurrentImg] = useState('')
  useEffect(() => {
    if((currentId <= 0 || currentId > 100) || isNaN(currentId) ) {
      navigate('/404')
    }
  }, []);
  useEffect(() => {
    if (!loading) {
      setCurrentImg(getProductById(currentId).images[0]);
    }
  }, [loading, currentId]);
  const linkHandler = () => {
    !isItemInCart(getProductById(currentId)) ? addToBusket(getProductById(currentId)) : console.log()
    setModalActive(true)
  }
  return (
  <>
    {loading ? <div>Loading...</div>
      :
      <>
        <div className='details'>
          <nav className="bread__link">
            <div className="outer-wrapper">
              <div className="bread__link-wrapper">
                <div className="bread__link-right">
                  <Link className='bread__link-store' to={'/'}>store</Link>
                  {`/${getProductById(currentId).category}/${getProductById(currentId).brand}/${getProductById(currentId).title}`}
                </div>
              </div>
            </div>
          </nav>
          <section className='details__container'>
            <div className="outer-wrapper">
              <div className="details__wrapper">
                <div className="details__wrapper-left">
                  <div className="details__presentaion-item-image-wrapper">
                    <div className="details__presentaion-item-image-helper">
                      <img
                        loading='lazy'
                        className='details__presentaion-item-image-img'
                        src={currentImg}
                        alt="item thumbnail"
                      />
                    </div>
                  </div>
                  <div className='details__wrapper-left-bottom'>
                    {uniqPict().map((item) => (
                      <div key={item} onClick={() => {setCurrentImg(item)}}><img className='details__items-img' src={item} alt="" /></div>
                    ))}
                  </div>
                </div>
                <div className="details__wrapper-right">
                  <title className='details__title'>{getProductById(currentId).title}</title>
                  <div className="rating-mini">
                    <span className={Math.ceil(getProductById(currentId).rating) >= 1 ? 'active-star' : ''}></span>	
                    <span className={Math.ceil(getProductById(currentId).rating) >= 2 ? 'active-star' : ''}></span>    
                    <span className={Math.ceil(getProductById(currentId).rating) >= 3 ? 'active-star' : ''}></span>  
                    <span className={Math.ceil(getProductById(currentId).rating) >= 4 ? 'active-star' : ''}></span>    
                    <span className={Math.ceil(getProductById(currentId).rating) >= 5 ? 'active-star' : ''}></span>
                  </div>
                  <div className="details__price">
                    ${getProductById(currentId).price}
                  </div>
                  <div className="details__describtion">
                    {getProductById(currentId).description}
                  </div>
                  <div className="details__buttons__wrapper">
                    {isItemInCart(getProductById(currentId))
                      ? <button className='add-to-busket-btn button' onClick={() => {removeCartProduct(getProductById(currentId))}}>REMOVE FROM BUSKET</button>
                      : <button className='add-to-busket-btn button' onClick={() => {setCartProduct(getProductById(currentId));}}>ADD TO BUSKET</button>
                    }
                    <Link className='buy-now__link' onClick={() => {linkHandler()}} to={'/busket'}>BUY NOW</Link>
                  </div>
                </div>
              </div>  
            </div>
          </section>
          <section className="details__product-details">
            <div className="outer-wrapper">
              <div className="details__product-details-wrapper">
                <div
                  className={
                    `details__product-details-left 
                      ${whatDisplay === 'details'
                        ? ''
                        : 'details__product-active'
                      }`
                  }
                  onClick={() => {setWhatDisplay('product-details')}
                  }
                >
                  Product Details
                </div>
                <div
                  className={`details__product-details-left
                  ${whatDisplay === 'details'
                    ? 'details__product-active'
                    : ''}`} onClick={() => {setWhatDisplay('details')}
                  }
                >
                  Details
                </div>
              </div>
              <div className="details__product-product-details">
                {whatDisplay === 'details'
                  ? <div className='product-details__details'>{getProductById(currentId).description}</div>
                  : <div className='product-details__details'>
                      <ul>
                        <li><span>brand</span>{getProductById(currentId).brand}</li>
                        <li><span>category</span>{getProductById(currentId).category}</li>
                        <li><span>rating</span>{getProductById(currentId).rating}</li>
                        <li><span>stock</span>{getProductById(currentId).stock}</li>
                        <li><span>discont</span>{getProductById(currentId).discountPercentage}</li>
                      </ul>
                    </div>
                }
              </div>
            </div>
          </section>
        </div>
      </>
    }
  </>
  )
}

export default DetailsComponent