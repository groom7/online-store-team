import { useState, useEffect } from 'react';

const useValidation = (value: string, validations: { [key: string]: boolean }) => {
  const [isEmpty, setEmpty] = useState(true);
  const [fullNameError, setFullNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [validThroughError, setValidThroughError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [inputValid, setInputValid] = useState(true);
  const [formatValue, setFormatValue] = useState('');
  const [isEmptyErrorText, setIsEmptyErrorText] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          if (value !== '') {
            setEmpty(false);
            setIsEmptyErrorText('');
          } else {
            setEmpty(true);
            setIsEmptyErrorText('Field cannot be empty');
          }
          break;
        case 'isFullName':
          const fullNameFormat = /^[\S]{3,}(\s[\S]{3,}){1,}$/;

          if (fullNameFormat.test(value)) {
            setFullNameError(false);
            setErrorText('');
          } else {
            setFullNameError(true);
            setErrorText('Incorrect first or last name');
          }
          break;
        case 'isPhoneNumber':
          const phoneNumberFormat = /^\+\d{9,}$/;

          if (phoneNumberFormat.test(value)) {
            setPhoneNumberError(false);
            setErrorText('');
          } else {
            setPhoneNumberError(true);
            setErrorText('Incorrect phone number');
          }
          break;
        case 'isAddress':
          const addressFormat = /^[\S]{5,}(\s[\S]{5,})(\s[\S]{5,}){1,}$/

          if (addressFormat.test(value)) {
            setAddressError(false);
            setErrorText('');
          } else {
            setAddressError(true);
            setErrorText('Incorrect address');
          }
          break;
        case 'isEmail':
          const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (emailFormat.test(String(value).toLowerCase())) {
            setEmailError(false);
            setErrorText('');
          } else {
            setEmailError(true);
            setErrorText('Incorrect email');
          }
          break;
        case 'isCardNumber':
          const cardNumber = value.replace(/\D/g, '')
          const cardNumberFormat = /\d{16}$/;

          if (cardNumberFormat.test(cardNumber)) {
            setCardNumberError(false);
            setErrorText('');
          } else {
            setCardNumberError(true);
            setErrorText('Incorrect card number');
          }
          setFormatValue(cardNumber);
          break;
        case 'isValidThrough':
          let expiryDate = value.replace(/\D/g, '');
          const dateFormat = /^(0[1-9]|1[0-2])\/(\d{2})*$/;
          
          if (expiryDate.length === 4) {
            expiryDate = expiryDate.replace(/(\d{2})(\d{2})/, '$1/$2');
          }
          if (dateFormat.test(expiryDate)) {
            setValidThroughError(false);
            setErrorText('');
          } else {
            setValidThroughError(true);
            setErrorText('Incorrect expiry date');
          }
          setFormatValue(expiryDate);
          break;
        case 'isCVV':
          const cvv = value.replace(/\D/g, '')
          const cvvFormat = /\d{3}$/;

          if (cvvFormat.test(cvv)) {
            setCvvError(false);
            setErrorText('');
          } else {
            setCvvError(true);
            setErrorText('Incorrect CVV');
          }
          setFormatValue(cvv);
          break;
      }
    }
  }, [value]);
  
  useEffect(() => {
    if (
      fullNameError
      || phoneNumberError
      || addressError
      || emailError
      || cardNumberError
      || validThroughError
      || cvvError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, fullNameError, phoneNumberError, addressError, emailError, cardNumberError, validThroughError, cvvError]);
  
  return {
    isEmpty,
    fullNameError,
    phoneNumberError,
    addressError,
    emailError,
    cardNumberError,
    validThroughError,
    cvvError,
    inputValid,
    formatValue,
    errorText,
    isEmptyErrorText
  }
}

export default useValidation;
