import React, { useContext } from 'react';
import { StoreStateContext } from '../../../App';
import { busketIsEmpty } from '../../../controllers/busketIsEmpty';
import { getAllBusketItems } from '../../../controllers/getAllBusketItems';
import { getAllProducts } from '../../../controllers/getAllProducts';
import { removeFromBusket } from '../../../controllers/removeFromBusket';
import { Response } from '../../../types/Response';


function Products() {
  const { setCartProduct, removeCartProduct } = useContext(StoreStateContext);
  const handleAddToBusket = (item: Response) => {
    setCartProduct(item);
  };
  const handleClick = () => {
    console.log(getAllBusketItems())
  }
  const tempHandleClick = () => {
    console.log(busketIsEmpty())
  }
  const handleDelete = (item: Response) => {
    removeCartProduct(item);
  }
  return (
   <div>
    <div>
      {getAllProducts().length === 0 ? <div>empty</div> : getAllProducts().map((item) => (
        <div className="block__wrapper">
          <div>{item.title}</div>
          <button onClick={() => { handleAddToBusket(item) }}>
            add to busket
          </button>
          <button onClick={() => { handleDelete(item) }}>Remove this</button>
        </div>
      ))}
    </div>
    <button onClick={() => {handleClick()}}>se all prodducts in busket</button>
    <button onClick={() => {tempHandleClick()}}>Is empty</button>
   </div>
  );
}

export default Products;
