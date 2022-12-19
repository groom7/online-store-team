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
export interface Store {
  state: {
      products: Response[],
      busket: {
        items: {
          [key: number]: {
            items: Response[],
            totalPrice: number,
          },
        },
        totalCount: number,
        totalPrice: number,
      },
      filters: {}
  },
  setProducts(array: Response[]): void,
  getAllProducts(): Response[],
  addToBusket(product: Response): void,
  getAllBusketItems(): Response[],
  busketIsEmpty(): boolean,
  removeFromBusket(id: Response): void
}