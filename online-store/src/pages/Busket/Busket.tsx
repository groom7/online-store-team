import { Fragment, useContext } from 'react';
import { StoreStateContext } from '../../App';
import EmptyCart from '../../components/Busket/EmptyCart/EmptyCart';
import ProductsInCart from '../../components/Busket/ProductsInCart/ProductsInCart';
import Summary from '../../components/Busket/Summary/Summary';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Busket.scss';
import { BusketProps } from '../../types/Response';

function Busket({modalActive, setModalActive}: BusketProps) {
  const { storeState } = useContext(StoreStateContext);
  return (
    <>
      <Header />
      <section className='cart-container'>
        { storeState.state.busket.cartTotalCount === 0 
        ? <EmptyCart /> 
        : <Fragment>
          <ProductsInCart />
          <Summary modalActive={modalActive} setModalActive={setModalActive} />
        </Fragment>
        }
      </section>
      <Footer />
    </>
  )
}

export default Busket