// store types

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
export interface IPropsMainPage {
  category: [] | string[],
    brands: [] | string[],
    handleCheckBox(type: string, payload: string | number) : void
}
export interface Store {
  state: {
    products: Response[];
    busket: Response[];
    filters: {
      category: [] | string[];
      brands: [] | string[];
      price: null | number;
      stock: null | number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } | any;
  };
  
  setProducts(array: Response[]): void;
  getAllProducts(): Response[];
  addToBusket(product: Response): void;
  getAllBusketItems(): Response[];
  busketIsEmpty(): boolean;
  removeFromBusket(id: Response): void;
  getAllCattegories(): string[];
  getAllBrands(): string[];
  addFilters(filter: string, payload: string | number): void;
  resetFilters(): void
}
