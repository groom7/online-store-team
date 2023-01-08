import { useContext, useState, ChangeEvent } from 'react'
import { StoreStateContext } from '../../../App';
import { promoCodeIsValid } from '../../../controllers/promoCodeIsValid';
import CheckoutModal from '../CheckoutModal/CheckoutModal';
import './Summary.scss';
import { BusketProps } from '../../../types/Response';

function Summary({modalActive, setModalActive}: BusketProps) {
  const { storeState, updateUserPromoCodes, applyUserPromoCode } = useContext(StoreStateContext);
  const totalDiscounAmount = storeState.state.busket.totalDiscounAmount;
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeDirty, setPromoCodeDirty] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState('Invalid promo code');
  const blurHandler = () => {
    setPromoCodeDirty(true);
  };
  const promoCodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const promoCodeString = String(event.target.value).trim().toUpperCase();
    setPromoCode(promoCodeString);
    if (promoCodeString === '') {
      setPromoCodeError('');
    } else if (!promoCodeIsValid(promoCodeString)) {
      setPromoCodeError('Promo code does not exist');
    } else {
      applyUserPromoCode(promoCodeString);
      setPromoCodeError('');
      setPromoCode('');
      setPromoCodeDirty(false);
    }
  };
  
  return (
    <>
      <div className='summary'>
        <div className='summary__title-wrapper'>
          <h4 className='title'>Summary</h4>
        </div>
        <span className='summary__total-count'>Total quantity: { storeState.state.busket.cartTotalCount } pcs</span>
        <span
          className='summary__total-price'
          style={totalDiscounAmount !== 0 ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
        >
          Subtotal: ${ storeState.state.busket.cartTotalPrice }
        </span>
        <section className='promo'>
          <ul className='promo__code-list'>
            { storeState.state.busket.promo.userPromoCodes.map(code => {
              return (
                <div className='user-promo-code' key={ window.crypto.randomUUID() }>
                  <span className='user-promo-code__text'>
                    { code }
                    : { storeState.state.busket.promo.percentageDiscounts[code] }% discount
                  </span>
                  <button 
                    className='user-promo-code__delete-button button hoverOrange'
                    value={code}
                    onClick={ () => { updateUserPromoCodes(code) }}
                  ></button>
                </div>
              )
            }) }
          </ul>
          {(promoCodeDirty && promoCodeError) && (<span className='promo-code-invalid-text'>{promoCodeError}</span>)}
          <input
              className='promo__input input'
              type="text"
              placeholder='Input promo code'
              onBlur={blurHandler}
              value={promoCode}
              onChange={promoCodeHandler}
          />
          <span className='promo__test-promo-text'>Use promo: 'NEWYEAR10', 'LUCKY10'</span>
        </section>
        <span className='summary__grand-total'>Grand total: ${ storeState.state.busket.cartGrandTotal }</span>
        <button className='summary__checkou-button' onClick={ () => setModalActive(true) } >PROCEED TO CHECKOUT</button>
      </div>
      <CheckoutModal active={ modalActive } setActive={ setModalActive }/>
    </>
  )
}

export default Summary