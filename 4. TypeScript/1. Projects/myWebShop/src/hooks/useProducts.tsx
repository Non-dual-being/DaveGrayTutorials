import { useContext } from "react"
import {UseProductsContextType } from "../context/ProductsProvider"
import ProductsContext from "../context/ProductsProvider"

const myProducts = (): UseProductsContextType => {
    return useContext(ProductsContext)
}

export default myProducts