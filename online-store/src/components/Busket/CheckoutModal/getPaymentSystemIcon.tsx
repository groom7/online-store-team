import visaIcon from '../../../assets/images/visa.png';
import mastercardIcon from '../../../assets/images/mastercard.png';
import maestroIcon from '../../../assets/images/maestro.png';
import crediCardIcon from '../../../assets/images/credit-card.png';

export const getPaymentSystemIcon = (cardNumber: string) => {
  const cardNumberFirstNumber = cardNumber.slice(0, 1);
  if (cardNumberFirstNumber === '4') {
    return visaIcon;
  } else if (cardNumberFirstNumber === '5') {
    return mastercardIcon;
  } else if (cardNumberFirstNumber === '6') {
    return maestroIcon;
  } else {
    return crediCardIcon;
  }
};