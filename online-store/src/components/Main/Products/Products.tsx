import React from 'react';
import { addToBusket } from '../../../controllers/addToBusket';
import { busketIsEmpty } from '../../../controllers/busketIsEmpty';
import { getAllBusketItems } from '../../../controllers/getAllBusketItems';
import { getAllProducts } from '../../../controllers/getAllProducts';
import { removeFromBusket } from '../../../controllers/removeFromBusket';
import { Response } from '../../../types/Response';
import '../../../styles/css/Products.css'
function Products() {
  const handleAddToBusket = (item: Response) => {
    addToBusket(item);
  };
  const handleClick = () => {
    console.log(getAllBusketItems())
  }
  const tempHandleClick = () => {
    console.log(busketIsEmpty())
  }
  const hadleDelete = (item: Response) => {
    removeFromBusket(item)
  }
  return (
   <>
    <div className='block__container'>
      {getAllProducts().length === 0 ? <div>empty</div> : getAllProducts().map((item) => (
        <div className="block__wrapper">
          <div>{item.title}</div>
          <div className='describtion'>
            <div>{item.category}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div>{item.discountPercentage}</div>
            <div>{item.rating}</div>
            <div>{item.stock}</div>
          </div>
          <img className='block__img' src={item.images[0]} alt="" />
          <button
            onClick={() => {
              handleAddToBusket(item);
            }}
          >
            add to busket
          </button>
          <button onClick={() => {hadleDelete(item)}}>Remove this</button>
        </div>
      ))}
     
    </div>
    <button onClick={() => {handleClick()}}>se all prodducts in busket</button>
    <button onClick={() => {tempHandleClick()}}>Is empty</button>
   </>
  );
}

export default Products;
