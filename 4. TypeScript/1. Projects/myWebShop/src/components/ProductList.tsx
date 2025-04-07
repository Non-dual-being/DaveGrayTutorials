import { ReactElement } from 'react'
import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import Product from './Product'
const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart} = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Page is loading ...</p>
  
  if (products?.length) {
    pageContent = products.map(myProduct => {
      const inCart: boolean = cart.some(item => item.sku === myProduct.sku)

      return (
        <Product 
          key = {myProduct.sku}
          product = {myProduct}
          dispatch = {dispatch}
          REDUCER_ACTIONS = {REDUCER_ACTIONS}
          inCart = {inCart}

        />
      )
    })
  }

  const content = (
    <main className="main main--products">
      {pageContent}
    </main>
  )

  return content
}

export default ProductList