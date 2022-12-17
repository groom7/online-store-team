import React, { useEffect, useState } from 'react'
import Filters from '../../components/Main/Filters/Filters'
import Products from '../../components/Main/Products/Products'
import '../../styles/scss/MainPage/mainPage.scss'
import { addFilters } from '../../controllers/addFilter';
import { useSearchParams } from 'react-router-dom';
import { setProducts } from '../../controllers/setProducts';
import { getAllProducts } from '../../controllers/getAllProducts';
function Main() {
  // const [searchParams, setSearchParams] =  useSearchParams()
  // console.log(searchParams)
  const [loading, setLoading] = useState(true)
  const setProduct = () => {
    fetch('https://dummyjson.com/products?limit=100').then((data) => {
      data.json().then((product) => {
        setProducts(product.products);
      });
    }).then(() => {
      getAllProducts().length === 0 ? setProduct() : setLoading(false)
    }).catch((err) =>   {
      if(err) {
        return err
      }
    });
  }
  useEffect(() => {
    setProduct()
  }, []);

  const initArr: string[] = [];
  const [category, setCategory] = React.useState(initArr)
  const [brands, setBrands] = React.useState(initArr)

  const handleCheckBox = (type: string, payload: string | number) => {
    addFilters(type, payload)
    if(type === 'category' && typeof payload === 'string') {
      if(category.includes(payload)){
        setCategory(category.filter(item => item !== payload))
      }else {
        setCategory(category.concat(payload))
      }
    }
    if(type === 'brands' && typeof payload === 'string') {
      if(brands.includes(payload)){
        setBrands(brands.filter(item => item !== payload))
      }else {
        setBrands(brands.concat(payload))
      }
    }

  }
  return (
    <div className='main__wrapper'>
      <Filters category={category} brands={brands} handleCheckBox={handleCheckBox}/>
      {loading ? <div>Loading please wait...</div> : ( <Products category={category} brands={brands} handleCheckBox={handleCheckBox} />)}
    </div>
  )
}

export default Main