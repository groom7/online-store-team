import { CartProductsData, Response, Store } from "../types/Response"
export const store: Store = {
  state: {
    products: [],
    busket: {
       cartProductsData: {

      },
      cartTotalCount: 0,
      cartTotalPrice: 0,
      cartTotalCards: 0,
    },
    filters: {
      category: [],
      brands: [],
      price: null,
      priceSecond: null,
      stock: null,
      stockSecond: null,
      search: '',
      sortBy: '',
      displayActive: false, // false - big, true - small
    },
  },
  setProducts(array) {
    this.state.products = JSON.parse(JSON.stringify(array));
  },
  filtersIsClear() {
    let filters = this.state.filters;
    if (
      filters.category.length === 0 &&
      filters.brands.length === 0 &&
      filters.price === null &&
      filters.stock === null &&
      filters.search === '' &&
      filters.sortBy === '' &&
      filters.priceSecond === null &&
      filters.stockSecond === null
    ) {
      return true;
    }
    return false;
  },
  changeDisplayStyle(type) {
    if (type === 'small') {
      this.state.filters.displayActive = true;
    } else {
      this.state.filters.displayActive = false;
    }
  },
  filterMainPage() {
    let filters = this.state.filters;
    let array = this.state.products;
    if (filters.brands.length !== 0) {
      array = array.filter((item) =>
        filters.brands.includes(item.brand as never)
      );
    }
    if (filters.category.length !== 0) {
      array = array.filter((item) =>
        filters.category.includes(item.category as never)
      );
    }
    if (filters.price !== null || filters.priceSecond !== null) {
      let max = Math.max(filters.price === null ? 10 : filters.price, filters.priceSecond === null ? 1749 : filters.priceSecond);
      let min = Math.min(filters.price === null ? 10 : filters.price, filters.priceSecond === null ? 1749 : filters.priceSecond);
      array = array.filter((item) => item.price >= min && item.price <= max);
    }
    if (filters.stock !== null || filters.stockSecond !== null) {
        let max = Math.max(filters.stock === null ? 2 : filters.stock, filters.stockSecond === null ? 150 : filters.stockSecond);
        let min = Math.min(filters.stock === null ? 2 : filters.stock, filters.stockSecond === null ? 150 : filters.stockSecond);
        array = array.filter((item) => item.stock >= min && item.stock <= max);
      }
    if (filters.search !== '') {
      array = array.filter((item) =>
        item.title.toLowerCase().includes(filters.search)
      );
    }
    if (filters.sortBy !== '') {
      if (filters.sortBy === 'Sort-by-price-ASC') {
        array = array.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'Sort-by-price-DESC') {
        array = array.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === 'Sort-by-rating-ASC') {
        array = array.sort((a, b) => a.rating - b.rating);
      } else if (filters.sortBy === 'Sort-by-rating-DESC') {
        array = array.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === 'Sort-by-discount-ASC') {
        array = array.sort(
          (a, b) => a.discountPercentage - b.discountPercentage
        );
      } else if (filters.sortBy === 'Sort-by-discount-DESC') {
        array = array.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
      }
    }
    return array;
  },
  getAllProducts() {
    return this.filtersIsClear() ? this.state.products : this.filterMainPage();
  },
  getAllClearProducts() {
    return this.state.products
  },
  addSelectOption(option: string) {
    this.state.filters.sortBy = option;
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
    },
  getAllCattegories() {
    let cattegories: string[] = [];
    this.state.products.forEach((item) => {
      if (!cattegories.includes(item.category)) {
        cattegories.push(item.category);
      }
    });
    return cattegories;
  },
  getAllBrands() {
    let brands: string[] = [];
    this.state.products.forEach((item) => {
      if (!brands.includes(item.brand)) {
        brands.push(item.brand);
      }
    });
    return brands;
  },
  addFilters(filter, payload) {
    const filters = this.state.filters;
    if (filter === 'category' && typeof payload === 'string') {
      if (filters.category.includes(payload as never)) {
        let index = filters.category.indexOf(payload as never);
        filters.category.splice(index, 1);
      } else {
        filters.category.push(payload as never);
      }
    }
    if (filter === 'brands' && typeof payload === 'string') {
      if (filters.brands.includes(payload as never)) {
        let index = filters.brands.indexOf(payload as never);
        filters.brands.splice(index, 1);
      } else {
        filters.brands.push(payload as never);
      }
    }
    if (filter === 'price' && typeof payload === 'number') {
      filters.price = payload;
    }
    if (filter === 'stock' && typeof payload === 'number') {
      filters.stock = payload;
    }
    if (filter === 'search' && typeof payload === 'string') {
      filters.search = payload;
    }
    if (filter === 'price-2' && typeof payload === 'number') {
      filters.priceSecond = payload;
    }
    if (filter === 'stock-2' && typeof payload === 'number') {
      filters.stockSecond = payload;
    }
  },
  resetFilters() {
    this.state.filters.category = [];
    this.state.filters.brands = [];
    this.state.filters.stock = null;
    this.state.filters.price = null;
    this.state.filters.search = '';
    this.state.filters.sortBy = '';
  },
};
