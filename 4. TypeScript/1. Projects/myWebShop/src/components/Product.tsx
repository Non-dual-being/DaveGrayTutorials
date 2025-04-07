import React, { ReactElement, memo } from 'react'
import { ProductType } from '../context/ProductsProvider'
import { ReducerActionType, ReducerAction } from '../context/CartProvider'
type propsType = {
    product: ProductType,
    dispatch: React.ActionDispatch<[action: ReducerAction]>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean
}

const Product = ({
    product, dispatch, REDUCER_ACTIONS, inCart
    
}: propsType): ReactElement => {

    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    const onAddToCart = () => dispatch ({ type: REDUCER_ACTIONS.ADD, payload: {...product, qty: 1 } })
    const itemInCart = inCart ? 'Item in Cart ✅' : null

    const content = <article className='product'>
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className='product__img'/>
      <p>{new Intl.NumberFormat('en-Us', {style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  
  return content
}

function IsProductEqual (
  {product: prevProduct, inCart: prevInCart}: propsType, 
  {product: nextProduct, inCart: nextInCart}: propsType
): boolean {
    return Object.keys(prevProduct).every(key => {
          return (prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
          && 
          prevInCart === nextInCart)      
      })
}

const MemoizedProduct = memo<typeof Product>(Product, IsProductEqual)

export default MemoizedProduct


/*
  Dynamische afbeelding via new URL(..., import.meta.url):

  - `${product.sku}.jpg` bouwt een bestandsnaam op basis van het product.
  - `import.meta.url` geeft de URL van het huidige modulebestand.
  - `new URL(path, import.meta.url)` maakt een absolute URL naar het afbeeldingsbestand.
  - `.href` geeft de stringvorm van de URL, bruikbaar als <img src=...>.

  → Nodig voor Vite zodat het afbeeldingsbestand wordt meegebundeld.
*/

/** ----[function isProductEqual]
 * 
 * De accolades in de paramter lijst zijn object destruering
 * React.memo maakt een object aan via previousProps en nextProps
 * Dus je schrijft niet (prevProps: propsType) maar je haalt direct de waarden eruit
 * De typecasting is nodig om Object.keys een array van srings teruggeeft en typestrict dat niet accepteert als van het zelfde type van Productype, door keyof te gebruiken maak je er een string literal union type van "SKU" | "Price" en zovderder
 * 
  */