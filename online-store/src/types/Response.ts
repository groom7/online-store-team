export interface Response {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface Store {
  state: {
    products: Response[];
    busket: Response[];
    filters: {
      category: [] | string[];
      brands: [] | string[];
      price: null | number;
      priceSecond: null | number,
      stock: null | number;
      stockSecond: null | number;
      search: string,
      sortBy: string,
      displayActive: boolean
    }
  };
  setProducts(array: Response[]): void;
  filtersIsClear() : boolean;
  changeDisplayStyle(type: string) : void;
  filterMainPage(): Response[];
  getAllProducts(): Response[];
  getAllClearProducts() : Response[]
  addToBusket(product: Response): void;
  getAllBusketItems(): Response[];
  busketIsEmpty(): boolean;
  removeFromBusket(id: Response): void;
  getAllCattegories(): string[];
  addSelectOption(option: string) : void
  getAllBrands(): string[];
  addFilters(filter: string, payload: string | number): void;
  resetFilters(): void
}
export interface IPropsProduct {
  displayProduct: boolean
  hadleDelete(item: Response): void,
  handleAddToBusket(item: Response): void,
  select: string,
  handleSearch(searchValue: string) : void,
  search: string,
  category: [] | string[],
    brands: [] | string[],
    inputStock:  number,
    inputPrice:  number,
    handleCheckBox(type: string, payload: string | number) : void
}
export interface IPropsFilters {
  inputStockSecond: number,
  inputPriceSecond: number,
  category: string[],
    brands:string[],
    inputStock:  number,
    inputPrice:  number,
    handleCheckBox(type: string, payload: string | number) : void
}
export interface HeaderProps {
  busket: Response[]
}