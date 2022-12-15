import { Store } from "../types/Response"

export const store:Store = {
    state: {
        products: [

        ],
        busket: [

        ],
        filters: {

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
    }
}