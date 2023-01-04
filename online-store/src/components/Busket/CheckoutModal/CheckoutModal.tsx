import { useState, FocusEvent, ChangeEvent, useEffect } from 'react';
import './CheckoutModal.scss';
import { getPaymentSystemIcon } from './getPaymentSystemIcon';
import { useNavigate } from "react-router-dom";
import { clearCart } from '../../../controllers/clearCart';

function CheckoutModal(
  { 
    active,
    setActive 
  }: {
    active: boolean,
    setActive(modalActive: boolean) : void
  }
) {
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('Field cannot be empty');
  const [fullNameDirty, setFullNameDirty] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('Field cannot be empty');
  const [phoneNumberDirty, setPhoneNumberDirty] = useState(false);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('Field cannot be empty');
  const [addressDirty, setAddressDirty] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('Field cannot be empty');
  const [emailDirty, setEmailDirty] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState('Field cannot be empty');
  const [cardNumberDirty, setCardNumberDirty] = useState(false);
  const [validThrough, setValidThrough] = useState('');
  const [validThroughError, setValidThroughError] = useState('Field cannot be empty');
  const [validThroughDirty, setValidThroughDirty] = useState(false);
  const [cvv, setCvv] = useState('');
  const [cvvError, setCvvError] = useState('Field cannot be empty');
  const [cvvDirty, setCvvDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const blurHandler = (event: FocusEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'full-name':
        setFullNameDirty(true);
        break;
      case 'phone':
        setPhoneNumberDirty(true);
        break;
      case 'address':
        setAddressDirty(true);
        break;
      case 'e-mail':
        setEmailDirty(true);
        break;
      case 'card-number':
        setCardNumberDirty(true);
        break;
      case 'valid through':
        setValidThroughDirty(true);
        break;
      case 'cvv':
        setCvvDirty(true);
        break;
    }
  };
const fullNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const fullName = event.target.value;
  setFullName(fullName);
  const fullNameFormat = /^[\S]{3,}(\s[\S]{3,}){1,}$/
  if (!fullNameFormat.test(fullName)) {
    setFullNameError('Incorrect first or last name')
  } else {
    setFullNameError('')
  }
};
const phoneNumberHandler = (event: ChangeEvent<HTMLInputElement>) => {
  setPhoneNumber(event.target.value);
  const reg = /^\+\d{9,}$/;
  if (!reg.test(event.target.value)) {
    setPhoneNumberError('Incorrect phone number')
  } else {
    setPhoneNumberError('')
  }
};
const addressHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const address = event.target.value;
  setAddress(address);
  const addressFormat = /^[\S]{5,}(\s[\S]{5,})(\s[\S]{5,}){1,}$/
  if (!addressFormat.test(address)) {
    setAddressError('Incorrect address')
  } else {
    setAddressError('')
  }
};
const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
  setEmail(event.target.value);
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reg.test(String(event.target.value).toLowerCase())) {
    setEmailError('Incorrect email')
  } else {
    setEmailError('')
  }
};
const cardNumberHandler = (event: ChangeEvent<HTMLInputElement>) => {
  setCardNumber(event.target.value.replace(/\D/g, ''));
  const reg = /\d{16}$/;
  if (!reg.test(event.target.value)) {
    setCardNumberError('Incorrect card number')
  } else {
    setCardNumberError('')
  }
};
const validThroughHandler = (event: ChangeEvent<HTMLInputElement>) => {
  let expiryDate = event.target.value.replace(/\D/g, '');
  const dateFormat = /^(0[1-9]|1[0-2])\/(\d{2})*$/;
  if (expiryDate.length === 4) {
    expiryDate = expiryDate.replace(/(\d{2})(\d{2})/, '$1/$2');
  }
  if (!dateFormat.test(expiryDate)) {
    setValidThroughError('Incorrect expiry date');
  } else {
    setValidThroughError('');
  }
  setValidThrough(expiryDate);
};
const cvvHandler = (event: ChangeEvent<HTMLInputElement>) => {
  setCvv(event.target.value.replace(/\D/g, ''));
  const reg = /\d{3}$/;
  if (!reg.test(event.target.value)) {
    setCvvError('Incorrect CVV')
  } else {
    setCvvError('')
  }
};
let commonError =
  fullNameError
  || phoneNumberError
  || addressError
  || emailError
  || cardNumberError
  || validThroughError
  || cvvError;
useEffect(() => {
  if (commonError) {
    setFormValid(false);
  } else {
    setFormValid(true);
  }
}, [commonError]);

const navigate = useNavigate();
const submitClickHandler = () => {
  clearCart();
  setOrderPlaced(true);
    setTimeout(() => {
      navigate('/');
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
              onBlur={ event => blurHandler(event) }
              value={ fullName }
              onChange={ (event) => fullNameHandler(event) }
              id='full-name'
            />
            {(fullNameDirty && fullNameError) && (<span className='field-invalid-text'>{ fullNameError }</span>)}
            <label htmlFor='phone'>Phone</label>
            <input
              name='phone'
              className='phone input'
              type='text'
              onBlur={ event => blurHandler(event) }
              value={ phoneNumber }
              onChange={ (event) => phoneNumberHandler(event) }
              id='phone'
            />
            {(phoneNumberDirty && phoneNumberError) && (<span className='field-invalid-text'>{ phoneNumberError }</span>)}
            <label htmlFor='address'>Address</label>
            <input
              name='address'
              className='address input'
              type='text'
              onBlur={ event => blurHandler(event) }
              value={ address }
              onChange={ (event) => addressHandler(event) }
              id='address'
            />
            {(addressDirty && addressError) && (<span className='field-invalid-text'>{ addressError }</span>)}
            <label htmlFor='email'>E-mail</label>
            <input
              name='e-mail'
              className='email input'
              type='email'
              onBlur={ event => blurHandler(event) }
              value={ email }
              onChange={ (event) => emailHandler(event) }
              id='email'
            />
            {(emailDirty && emailError) && (<span className='field-invalid-text'>{ emailError }</span>)}
            <div className='payment-details'>
              <div className='payment-details__header'>
                <h4 className='title'>Payment details:</h4>
                <img
                  src={ getPaymentSystemIcon(cardNumber) }
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
                  onBlur={ event => blurHandler(event) }
                  value={ cardNumber }
                  onChange={ (event) => cardNumberHandler(event) }
                  id='card-number'
                  maxLength={16}
                />
                <span className='payment-system-hint'>4-Visa, 5-MasterCard, 6-Maestro</span>
                {(cardNumberDirty && cardNumberError) && (<span className='field-invalid-text'>{ cardNumberError }</span>)}
              </div>
              <div className="valid-through-info">
                <label htmlFor='valid-throgh'>Valid through</label>
                <input
                  name='valid through'
                  className='valid-through input'
                  type='tel'
                  onBlur={ event => blurHandler(event) }
                  onChange={ (event) => validThroughHandler(event) }
                  value={ validThrough }
                  maxLength={5}
                  id='valid-through'
                  placeholder='MMYY'
                />
                {(validThroughDirty && validThroughError) && (<span className='field-invalid-text'>{ validThroughError }</span>)}
              </div>
              <div className="cvv-info">
                <label htmlFor='cvv'>CVV</label>
                <input
                  name='cvv'
                  className='cvv input'
                  type='tel'
                  onBlur={ event => blurHandler(event) }
                  onChange={ event => cvvHandler(event) }
                  value={ cvv }
                  id='cvv'
                  maxLength={3}
                />
                {(cvvDirty && cvvError) && (<span className='field-invalid-text'>{ cvvError }</span>)}
              </div>
              </div>
            </div>
            <button
              className='place-order-button button'
              type='submit'
              disabled={!formValid}
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