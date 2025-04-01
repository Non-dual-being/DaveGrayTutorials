import { useContext } from "react"
import {UseCartContextType } from "../context/CartProvider"
import cartContext from "../context/CartProvider"


const useCart = (): UseCartContextType => {
    return useContext(cartContext)
}

export default useCart