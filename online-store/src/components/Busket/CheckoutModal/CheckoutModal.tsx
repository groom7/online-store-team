import { useState } from 'react';
import './CheckoutModal.scss';
import { getPaymentSystemIcon } from './getPaymentSystemIcon';
import { useNavigate } from "react-router-dom";
import { clearCart } from '../../../controllers/clearCart';
import useValidation from '../../../hooks/useValidation';

function CheckoutModal(
  { 
    active,
    setActive 
  }: {
    active: boolean,
    setActive(modalActive: boolean) : void
  }
) {
  const fullName = useInput('', { isEmpty: true, isFullName: true });
  const phoneNumber = useInput('', { isEmpty: true, isPhoneNumber: true });
  const address = useInput('', { isEmpty: true, isAddress: true });
  const email = useInput('', { isEmpty: true, isEmail: true });
  const cardNumber = useInput('', { isEmpty: true, isCardNumber: true });
  const validThrough = useInput('', { isEmpty: true, isValidThrough: true });
  const cvv = useInput('', { isEmpty: true, isCVV: true });
  const [orderPlaced, setOrderPlaced] = useState(false);

const navigate = useNavigate();
const submitClickHandler = () => {
  clearCart();
  setOrderPlaced(true);
    const redirectDelayTimer = setTimeout(() => {
      navigate('/');
      clearTimeout(redirectDelayTimer);
      setActive(false);
    }, 2000)
};

return (
  <div className={ active ? 'checkout-modal modal-active' : 'checkout-modal'} onClick={ () => setActive(false) }>
    <div className='checkout-modal__content' onClick={ (event) => event.stopPropagation() }>
      <div className='content-outer-wrapper'>
        { orderPlaced ? (
          <h1 className='order-placed-message'>Your order has been placed!</h1>
        ) : (
          <>
            <h2 className='modal-title'>Billing details:</h2>
            <label htmlFor='full-name'>Full name</label>
            <input
              name='full-name'
              className='full-name input'
              type='text'
              onBlur={ () => fullName.onBlur() }
              value={ fullName.value }
              onChange={ (event) => fullName.onChange(event) }
              id='full-name'
            />
            {(fullName.isDirty  && (fullName.isEmpty || fullName.fullNameError)) && (
              <span className='field-invalid-text'>
                { fullName.isEmptyErrorText || fullName.errorText }
              </span>
            )}
            <label htmlFor='phone'>Phone</label>
            <input
              name='phone'
              className='phone input'
              type='text'
              onBlur={ () => phoneNumber.onBlur() }
              value={ phoneNumber.value }
              onChange={ (event) => phoneNumber.onChange(event) }
              id='phone'
            />
            {(phoneNumber.isDirty && (phoneNumber.isEmpty || phoneNumber.phoneNumberError)) && (
              <span className='field-invalid-text'>
                { phoneNumber.isEmptyErrorText || phoneNumber.errorText }
              </span>
            )}
            <label htmlFor='address'>Address</label>
            <input
              name='address'
              className='address input'
              type='text'
              onBlur={ () => address.onBlur() }
              value={ address.value }
              onChange={ (event) => address.onChange(event) }
              id='address'
            />
            {(address.isDirty && (address.isEmpty || address.addressError)) && (
              <span className='field-invalid-text'>
                { address.isEmptyErrorText || address.errorText }
              </span>
            )}
            <label htmlFor='email'>E-mail</label>
            <input
              name='e-mail'
              className='email input'
              type='email'
              onBlur={ () => email.onBlur() }
              value={ email.value }
              onChange={ (event) => email.onChange(event) }
              id='email'
            />
            {(email.isDirty && (email.isEmpty || email.emailError)) && (
              <span className='field-invalid-text'>
                { email.isEmptyErrorText || email.errorText }
              </span>
            )}
            <div className='payment-details'>
              <div className='payment-details__header'>
                <h4 className='title'>Payment details:</h4>
                <img
                  src={ getPaymentSystemIcon(cardNumber.value) }
                  className='payment-system-icon'
                  alt="cart-icon"
                />
              </div>
              <div className='payment-details__card'>
              <div className="card-number-info">
                <label htmlFor='card-number'>Card number</label>
                <input
                  name='card-number'
                  className='card-number input'
                  type='tel'
                  onBlur={ () => cardNumber.onBlur() }
                  value={ cardNumber.formatValue }
                  onChange={ (event) => cardNumber.onChange(event) }
                  id='card-number'
                  maxLength={16}
                />
                <span className='payment-system-hint'>4-Visa, 5-MasterCard, 6-Maestro</span>
                {(cardNumber.isDirty && (cardNumber.isEmpty || cardNumber.cardNumberError)) && (
                  <span className='field-invalid-text'>
                    { cardNumber.isEmptyErrorText || cardNumber.errorText }
                  </span>
                )}
              </div>
              <div className="valid-through-info">
                <label htmlFor='valid-throgh'>Valid through</label>
                <input
                  name='valid through'
                  className='valid-through input'
                  type='tel'
                  onBlur={ () => validThrough.onBlur() }
                  onChange={ (event) => validThrough.onChange(event) }
                  value={ validThrough.formatValue }
                  maxLength={5}
                  id='valid-through'
                  placeholder='MMYY'
                />
                {(validThrough.isDirty && (validThrough.isEmpty || validThrough.validThroughError)) && (
                  <span className='field-invalid-text'>
                    { validThrough.isEmptyErrorText || validThrough.errorText }
                  </span>
                )}
              </div>
              <div className="cvv-info">
                <label htmlFor='cvv'>CVV</label>
                <input
                  name='cvv'
                  className='cvv input'
                  type='tel'
                  onBlur={ () => cvv.onBlur() }
                  onChange={ (event) => cvv.onChange(event) }
                  value={ cvv.formatValue }
                  id='cvv'
                  maxLength={3}
                />
                {(cvv.isDirty && (cvv.isEmpty || cvv.cvvError)) && (
                  <span className='field-invalid-text'>
                    { cvv.isEmptyErrorText || cvv.errorText }
                  </span>
                )}
              </div>
              </div>
            </div>
            <button
              className='place-order-button button'
              type='submit'
              disabled={ 
                !fullName.inputValid
                || !phoneNumber.inputValid
                || !address.inputValid
                || !email.inputValid
                || !cardNumber.inputValid
                || !validThrough.inputValid
                || !cvv.inputValid
              }
              onClick={ submitClickHandler }
            >place order</button> 
          </>
        )}
      </div>
    </div>
  </div>
  )
}

export default CheckoutModal;
