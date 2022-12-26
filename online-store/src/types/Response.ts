export interface Response{
  brand: string,
  category: string,
  description: string,
  discountPercentage: number,
  id: number,
  images: string[],
  price: number,
  rating: number,
  stock: number,
  thumbnail: string,
  title: string
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
      products: Response[],
      busket: BusketState,
      filters: {}
  },
  setProducts(array: Response[]): void,
  getAllProducts(): Response[],
  addToBusket(product: Response): void,
  getAllBusketItems(): CartProductsData,
  busketIsEmpty(): boolean,
  removeFromBusket(productData: Response): void,
  getTotalPrice(arr: Response[]): number,
  recalculateCartTotals(): void,
  recalculateCartTotalCards(): void,
}