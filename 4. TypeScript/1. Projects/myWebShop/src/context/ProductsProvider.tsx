import { Children, createContext, ReactElement, useState, useEffect } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number
}

const initState2: ProductType[] = [];


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
}

const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = { children?: ReactElement | ReactElement[]}

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>([]) // lege array zodat het niet undefined blijft

    const fetchMyProducts = async (): Promise<ProductType[]> => 
        {
            let response: Response
            try {
                response = await fetch("http://localhost:3500/products") 
            } catch (networkError){
                console.error(`NetworkError: ${networkError}`);
                throw new Error('Fout in het ophalen')
            }
            
            if (!response.ok){
                console.error(`HTTP-Fout: status: ${response.status} fouttext: ${response.text}`);
                throw new Error('HTTPFOUT')  
            }

            try {
                const data = await response.json()
                return data

            } catch (err) {
                console.error(`Fout in het parsen naar json: ${err}`)
                throw new Error("Ongeldig JSON-formaat in serverantwoord.")
                /**
                 * Bij een trow Error laat je de foutafhandeling bij de degene die de functie aanroept
                 * Tergelijktijd door een fout te gooien ga je over naar een never return
                 * Never betekent ik ga nooit iets terugeven
                 * Dit breekt niet met: "als ik iets teruggeef dan is het van het type products[]"
                 */

            }
        
       
    }
    
    useEffect(() => {
        fetchMyProducts()
            .then(products => setProducts(products))
            .catch((err) => {
                if (err instanceof Error) {console.error(err.message)}
                else {console.error("fout in het ophalen van de data")}
            })                
    }, [])
        






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

/**
 * Initstate wordt hier opgehaald van lexical scope, dus van buiten de fucntie in dezelfde file
 * Dit wil zeggen dat inistate 1 keer wordt aangeroepen en bij herrenders gebruik react zijn internal state om dezelfde waarde opte halen zonder herinitstalisatie
 */