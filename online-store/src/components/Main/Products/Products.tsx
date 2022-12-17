import React from 'react';
import { addToBusket } from '../../../controllers/addToBusket';
import { busketIsEmpty } from '../../../controllers/busketIsEmpty';
import { getAllBusketItems } from '../../../controllers/getAllBusketItems';
import { getAllProducts } from '../../../controllers/getAllProducts';
import { removeFromBusket } from '../../../controllers/removeFromBusket';
import { IPropsMainPage, Response } from '../../../types/Response';

function Products(props: IPropsMainPage) {
  const {category = [], brands = [], handleCheckBox} = props
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
  const filterMainPage = (array: Response[]) => {
    let res = array
    if(brands.length !== 0) {
      res = res.filter((item) => brands.includes(item.brand))
    }
    if(category.length !== 0) {
      res = res.filter((item) => category.includes(item.category))
    }
    return res
  }
  return (
   <>
    <div className='block__container'>
      {getAllProducts().length === 0 ? <div>empty</div> : filterMainPage(getAllProducts()).map((item, i) => (
        <div className="block__wrapper" key={i + 2}>
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
