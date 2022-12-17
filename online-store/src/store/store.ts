import { Store } from "../types/Response"

export const store:Store = {
    state: {
        products: [

        ],
        busket: [

        ],
        filters: {
            category: [

            ],
            brands: [

            ],
            price: null,
            stock: null
        }
    },
    setProducts(array) {
        this.state.products = JSON.parse(JSON.stringify(array))
    },
    getAllProducts() {
        return this.state.products
    },
    addToBusket(product) {
        this.state.busket.push(product)
    },
    getAllBusketItems() {
        return this.state.busket
    },
    busketIsEmpty() {
        if(this.state.busket.length === 0) {
            return true
        }else {
            return false
        }
    },
    removeFromBusket(item) {
        let index = this.state.busket.indexOf(item)
        if (index !== -1) {
            this.state.busket.splice(index, 1)
        }
    },
    getAllCattegories() {
        let cattegories: string[] = []
        this.state.products.forEach((item) => {
            if(!cattegories.includes(item.category)){
                cattegories.push(item.category)
            }
        })
        return cattegories
    },
    getAllBrands() {
        let brands: string[] = []
        this.state.products.forEach((item) => {
            if(!brands.includes(item.brand)){
                brands.push(item.brand)
            }
        })
        return brands
    },
    addFilters(filter, payload) {
        let filters = this.state.filters
        if(filter in filters) {
            console.log(filter, payload)
             if(typeof payload === 'string'){
                if(filters[filter].includes(payload)) {
                    let index = filters[filter].indexOf(payload)
                    filters[filter].splice(index, 1)
                }else {
                    filters[filter].push(payload)
                }
             }
             if(typeof payload === 'number') {
                filters[filter] = payload
             }
        }
        console.log(this.state.filters)
    },
    resetFilters() {
        this.state.filters.category = []
        this.state.filters.brands = []
        this.state.filters.stock = null
        this.state.filters.price = null
    },
}