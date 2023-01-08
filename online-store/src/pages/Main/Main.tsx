import { useEffect, useState } from 'react';
import Filters from '../../components/Main/Filters/Filters';
import Products from '../../components/Main/Products/Products';
import './mainPage.scss';
import { addFilters } from '../../controllers/addFilter';
import { getAllProducts } from '../../controllers/getAllProducts';
import { addSelectOption } from '../../controllers/addSelectOption';
import Header from '../../components/Header/Header';
import { changeDisplayStyle } from '../../controllers/changeDisplayStyle';
import { useSearchParams } from 'react-router-dom';
import { getAllClearProducts } from '../../controllers/getAllClearProducts';
import Footer from '../../components/Footer/Footer';
import { MainProps } from '../../types/Response';
function Main({loading}: MainProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const Pcategory = searchParams.get('Pcategory')
  const Pbrands = searchParams.get('Pbrands')
  const Pprice = searchParams.get('Pprice')
  const Pstock = searchParams.get('Pstock')
  const Psort = searchParams.get('Psort')
  const Pdisplay = searchParams.get('Pdisplay')
  const Psearch = searchParams.get('Psearch')
  const params = []
  const searchs: {[key: string] : string} = {}
  for(let entry of searchParams.entries()) {
    params.push(entry[0] + '=' + entry[1])
    searchs[entry[0]] = entry[1]
  }
  const handleCheckBox = (type: string, payload: string | number) => {
    if (type === 'select' && typeof payload === 'string') {
      setSelect(payload);
      addSelectOption(payload);
      setSearchParams({...searchs ,Psort: payload })
    }
    if (type === 'reset') {
      setInputPrice(1);
      setInputStock(2);
      setInputStockSecond(150);
      setInputPriceSecond(1749);
      setBrands([]);
      setCategory([]);
      setSearch('');
      setSelect('');
      setSearchParams({})
    } else {
      addFilters(type, payload);
    }
    if (type === 'category' && typeof payload === 'string') {
      if (category.includes(payload)) {
        setCategory(category.filter((item) => item !== payload));
        let arr = Pcategory?.split('↕').filter((item) => item !== payload)
        if( arr?.join('↕') !== undefined && arr.length !== 0) {
          setSearchParams({...searchs ,Pcategory: arr.join('↕')})
        }else {
          delete searchs.Pcategory
          setSearchParams({...searchs })
        }
      } else {
        setCategory(category.concat(payload));
        if(Pcategory !== null) {
          setSearchParams({...searchs ,Pcategory: payload + '↕' + Pcategory })
        }else {
          setSearchParams({...searchs ,Pcategory: payload })
        }
      }
      
    }
    if (type === 'brands' && typeof payload === 'string') {
      if (brands.includes(payload)) {
        setBrands(brands.filter((item) => item !== payload));
        let arr = Pbrands?.split('↕').filter((item) => item !== payload)
       if( arr?.join('↕') !== undefined && arr.length !== 0) {
          setSearchParams({...searchs ,Pbrands: arr.join('↕')})
        }else {
          delete searchs.Pbrands
          setSearchParams({...searchs })
        }
      } else {
        setBrands(brands.concat(payload));
        if(Pbrands !== null) {
          setSearchParams({...searchs ,Pbrands: payload + '↕' + Pbrands })
        }else {
          setSearchParams({...searchs, Pbrands: payload})
        }
      }
    }
    if(getAllProducts().length !== 0 && typeof payload !== 'number') {
      let minPrice = getAllProducts().reduce((item1, item2) => item1.price < item2.price ? item1 : item2)
    setInputPrice(minPrice.price)
    let maxPrice = getAllProducts().reduce((item1, item2) => item1.price > item2.price ? item1 : item2)
    setInputPriceSecond(maxPrice.price)
    let minStock = getAllProducts().reduce((item1, item2) => item1.stock < item2.stock ? item1 : item2)
    setInputStock(minStock.stock)
    let maxStock = getAllProducts().reduce((item1, item2) => item1.stock > item2.stock ? item1 : item2)
    setInputStockSecond(maxStock.stock)
    }
    if (type === 'price' && typeof payload === 'number') {
      setInputPrice(payload);
        setSearchParams({...searchs,Pprice: payload + '↕' + inputPriceSecond })
    }
    if (type === 'price-2' && typeof payload === 'number') {
      setInputPriceSecond(payload);
      setSearchParams({...searchs,Pprice: inputPrice + '↕' + payload })
    }
    if (type === 'stock-2' && typeof payload === 'number') {
      setInputStockSecond(payload);
      setSearchParams({...searchs,Pstock: payload + '↕' + inputStock })
    }
    if (type === 'stock' && typeof payload === 'number') {
      setInputStock(payload);
      setSearchParams({...searchs,Pstock:  inputStockSecond + '↕' + payload})
    }
    if (type === 'display') {
      if (payload === 'list-view') {
        changeDisplayStyle('list-view');
        setDisplayProduct(true);
        setSearchParams({...searchs ,Pdisplay: 'true' })
      } else {
        changeDisplayStyle('squares-view');
        setDisplayProduct(false);
        setSearchParams({...searchs ,Pdisplay: 'false' })
      }
    }
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    addFilters('search', searchValue);
    setSearchParams({...searchs ,Psearch: searchValue })
  };
  
  useEffect(() => {
    if(Pbrands !== null && brands.length === 0) {
      Pbrands.split("↕").forEach((item) => {
        addFilters('brands', item);
        setBrands(brands.concat(item))
      })
    }
    if(Pcategory !== null && category.length === 0) {
      Pcategory.split("↕").forEach((item) => {
        addFilters("category", item);
        setCategory(category.concat(item))
      })
    }
    if(Pdisplay !== null) {
      if(Pdisplay === 'true' || Pdisplay === 'false') {
        setDisplayProduct(Pdisplay === 'true' ? true : false)
        changeDisplayStyle(Pdisplay === 'true' ? 'list-view' : 'squares-view');
      }else {
        handleCheckBox('reset', '')
      }
    }
    if(Psort !== null && select.length === 0) {
      setSelect(Psort);
      addSelectOption(Psort);
    }
    if(Pprice !== null && inputPrice === 1 && inputPriceSecond === 1749) {
      if(+(Pprice.split('↕')[0]) > 0 && +(Pprice.split('↕')[1]) <= 1749) {
        setInputPrice(+(Pprice.split("↕")[0]))
      addFilters('price', +(Pprice.split("↕")[0]))
      setInputPriceSecond(+(Pprice.split("↕")[1]))
      addFilters('price-2', +(Pprice.split("↕")[1]))
      }else {
        handleCheckBox('reset', '')
      }
    }
    if(Pstock !== null && inputStock === 2 && inputStockSecond === 150) {
      if(+(Pstock.split('↕')[0]) >= 2 && +(Pstock.split('↕')[1]) <= 150) {
        setInputStock(+(Pstock.split("↕")[0]))
      addFilters('stock', +(Pstock.split("↕")[0]))
      setInputStockSecond(+(Pstock.split("↕")[1]))
      addFilters('stock-2', +(Pstock.split("↕")[1]))
      }else {
        handleCheckBox('reset', '')
      }
    }
    if(Psearch !== '' && Psearch !== null && search === '') {
      setSearch(Psearch)
      addFilters('search', Psearch);
    }
  }, [Pbrands, Pcategory, Pprice, Psort, Pdisplay, Psearch]);

  const [category, setCategory] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [inputPrice, setInputPrice] = useState<number>(1);
  const [inputPriceSecond, setInputPriceSecond] = useState<number>(1749);
  const [inputStock, setInputStock] = useState<number>(2);
  const [inputStockSecond, setInputStockSecond] = useState<number>(150);
  const [search, setSearch] = useState<string>('');
  const [select, setSelect] = useState<string>('');
  const [displayProduct, setDisplayProduct] = useState(false);

  return (
    <>
      <Header />
      <div className="main">
        <div className="outer-wrapper">
          <div className="main__wrapper">
            <Filters
              inputPriceSecond={inputPriceSecond}
              inputStockSecond={inputStockSecond}
              category={category}
              brands={brands}
              handleCheckBox={handleCheckBox}
              inputStock={inputStock}
              inputPrice={inputPrice}
            />
           <Products
                loading={loading}
                displayProduct={displayProduct}
                select={select}
                handleSearch={handleSearch}
                search={search}
                handleCheckBox={handleCheckBox}
              />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
