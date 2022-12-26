import { useContext } from 'react'
import { StoreStateContext } from '../../../App';
import './Summary.scss';


function Summary() {
  const { storeState } = useContext(StoreStateContext);
  return (
    <div className='summary'>
      <div className='summary__title-wrapper'>
        <h4 className='title'>Summary</h4>
      </div>
      <span className='summary__total-count'>Total quantity: { storeState.state.busket.cartTotalCount } pcs</span>
      <span className='summary__total-price'>Total price: ${ storeState.state.busket.cartTotalPrice }</span>
      <input className='summary__promo-input' type="text" placeholder='Enter promo code'/>
      <span className='summary__test-promo-text'>Use promo: 'HAPPYNEWYEAR'</span>
      <span className='summary__grand-total'>Grand total: ${ storeState.state.busket.cartTotalPrice }</span>
      <button className='summary__checkou-button'>PROCEED TO CHECKOUT</button>
    </div>
  )
}

export default Summary