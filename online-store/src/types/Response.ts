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
export interface CartProductsData {
  [key: number]: {
    identicalProducts: Response[],
    groupTotalPrice: number,
    groupTotalCount: number,
  },
}
export interface BusketState {
  cartProductsData: CartProductsData,
  cartTotalCount: number,
  cartTotalPrice: number,
  cartTotalCards: number,
}
export interface Store {
  state: {
    products: Response[];
    busket: BusketState,
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
  getProductById(id: number): Response;
  getAllClearProducts() : Response[]
  addToBusket(product: Response): void;
  getAllBusketItems(): CartProductsData,
  busketIsEmpty(): boolean;
  getAllBusketItemsLength(): number;
  removeFromBusket(productData: Response): void,
  getAllCattegories(): string[];
  addSelectOption(option: string) : void
  getAllBrands(): string[];
  addFilters(filter: string, payload: string | number): void;
  resetFilters(): void
  getTotalPrice(arr: Response[]): number,
  recalculateCartTotals(): void,
  recalculateCartTotalCards(): void,
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