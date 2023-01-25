import { Response } from "../types/Response";

export const busketDefaultState = JSON.stringify({
  cartProductsData: {},
  promo: {
    percentageDiscounts: {
      'NEWYEAR10': 10,
      'LUCKY10':  10,
    },
    userPromoCodes: [],
  },
  cartTotalCount: 0,
  cartTotalPrice: 0,
  cartTotalCards: 0,
  totalDiscounAmount: 0,
  cartGrandTotal: 0
});

export const itemData: Response = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  images: [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    "https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg",
    "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
  ]
};

export const selectOption = 'Sort by price ASC'

export const productsLength = 100
export const productsIncrements = 20
