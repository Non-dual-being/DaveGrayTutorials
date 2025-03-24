import { Children, createContext, ReactElement, useState } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number
}

const initState: ProductType[] = [
    {
    "sku": "item0001",
    "name": "Widget",
    "price": 9.99
    },
    {
    "sku": "item0002",
    "name": "Premium Widget",
    "price": 19.99
    },
    {
    "sku": "item0003",
    "name": "Deluxe Widget",
    "price": 29.99
    }
]

export type UseProductsContextType = {
    products: ProductType[]
}

const initContextState: UseProductsContextType = {
    products: [
/*         {
        "sku": "item0001",
        "name": "Widget",
        "price": 9.99
        },
        {
        "sku": "item0002",
        "name": "Premium Widget",
        "price": 19.99
        },
        {
        "sku": "item0003",
        "name": "Deluxe Widget",
        "price": 29.99
        } */
    ]
}

const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = { children?: ReactElement | ReactElement[]}

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState)

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext

/**
 * createContext maakt het mogelijk om in een je componenten useContext te gebruiken 
 * Met useContext kun je dan ProductContext ontvangen en die bevat de lijst met producten
 * Dit is een initiele waarde
 * Om de product uit te halen ga je moeten indexeren op de sleutel of gebruik maken van Object destructering
 * Objec destruerng doe je met { Products } anders doe je in twee stappen met ContextValue = useContext(ProductsContext) en dan contextvalue.products 
 * Een lege array mag omdat het contract is dat het alleen items mag bevatten van dat type, dus als er niets inzit ovetreed je die regel niet
 * 
 */


/**
 * verschil reactNode Reactelement
 * Reactelement is een jsx element dus bvb <Header />
 * ReactNode is alles want je mag renderen binnnen jsx dus ook bvb {true}
 */

/**
 * je value { products } werkt omdat je hiermee shorthanded dus products : products schrijft en dus voldoet aan products : productstype [4]
 */