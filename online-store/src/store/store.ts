import { CartProductsData, Response, Store } from "../types/Response"

export const store:Store = {
    state: {
        products: [

        ],
        busket: {
          cartProductsData: {

          },
          cartTotalCount: 0,
          cartTotalPrice: 0,
          cartTotalCards: 0,
        },
        filters: {

        }
    },
    setProducts(array) {
        this.state.products = JSON.parse(JSON.stringify(array))
    },
    getAllProducts() {
        return this.state.products
    },
    addToBusket(productData) {
      const identicalProducts = 
        !this.state.busket.cartProductsData[productData.id]
        ? [productData]
        : [
          ...this.state.busket.cartProductsData[productData.id].identicalProducts,
          productData
        ];
      //create common products data with exist cart products and last added
      const newCartProductsData = {
        ...this.state.busket.cartProductsData,
        [productData.id]: {
          identicalProducts: identicalProducts,
          groupTotalCount: identicalProducts.length,
          groupTotalPrice: this.getTotalPrice(identicalProducts),
        },
      };
      this.state.busket.cartProductsData = 
        JSON.parse(JSON.stringify(newCartProductsData));
      this.recalculateCartTotals();
      this.recalculateCartTotalCards();
    },
    getAllBusketItems() {
        return this.state.busket.cartProductsData;
    },
    busketIsEmpty() {
        if (this.state.busket.cartTotalCount === 0) {
            return true
        } else {
            return false
        }
    },
    removeFromBusket(productData) {
      const productId = productData.id;
      let cartProductsData: CartProductsData = this.state.busket.cartProductsData;
      if (cartProductsData.hasOwnProperty(productId)) {
        if (cartProductsData[productId].identicalProducts.length > 1) {
          cartProductsData[productId].identicalProducts.pop();
          cartProductsData[productId].groupTotalPrice = 
            this.getTotalPrice(cartProductsData[productId].identicalProducts);
          cartProductsData[productId].groupTotalCount = 
            cartProductsData[productId].identicalProducts.length;
        } else {
          const newCartProductsData: CartProductsData = 
            JSON.parse(JSON.stringify(cartProductsData));
          delete newCartProductsData[productId];
          this.state.busket.cartProductsData = 
            JSON.parse(JSON.stringify(newCartProductsData));
        }
        this.recalculateCartTotals();
        this.recalculateCartTotalCards();
      }
    },
    getTotalPrice(arr: Response[]) {
      return arr.reduce((sum, item) => sum + item.price, 0);
    },
    recalculateCartTotals() {
      const totalCount = 
        Object.values(this.state.busket.cartProductsData)
        .reduce((sum, item) => sum + item.identicalProducts.length, 0);
      const totalPrice =
        Object.values(this.state.busket.cartProductsData)
        .reduce((sum, item) => sum + item.groupTotalPrice, 0);
      this.state.busket.cartTotalCount = totalCount;
      this.state.busket.cartTotalPrice = totalPrice;
    },
    recalculateCartTotalCards() {
      const cartTotalCards = 
        Object.keys(this.state.busket.cartProductsData).length;
      this.state.busket.cartTotalCards = cartTotalCards;
    }
}