import { createContext, ReactElement, useMemo, useReducer } from "react"

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType
}

/**
 * by switching the action type of a user types in add the the value add will be equal to REDUCER_ACTION_TYPE.add
 *  
 */

const reducer = (state: CartStateType, action: ReducerAction ): CartStateType => {
    switch (action.type){
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload){
                throw new Error("action.payload missing in ADD action")
            }
            const { sku, name, price } = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            const qty: number = itemExists ? itemExists.qty + 1 : 1

            return { ...state, cart: [...filteredCart, {sku, name, price, qty}]}

        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload){
                throw new Error("action.payload missing in REMOVE action")
            }

            const { sku } = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return { ...state, cart: [...filteredCart]}

        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload){
                throw new Error("action.payload missing in QUANTITY action")

            }
            const { sku, qty } = action.payload
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            if (!itemExists) { throw new Error('Item must exist in orde to update quantity')}

            const updatedItem: CartItemType = {...itemExists, qty }
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return { ...state, cart: [...filteredCart, updatedItem] }

            }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: []}
        }

        
        default:
            throw new Error ("Unindentified reducer action type")
    }
}

const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems: number = state.cart.reduce((previousValue, cartItem)=> {
        return previousValue + cartItem.qty
    }, 0)

    /**dit is gewoon de reduce functie van een array, die steeds de qty's pakt en de eerst value is 0 */


    // internatiional numbe format
    const totalPrice: string = new Intl.NumberFormat('en-Us', { style: 'currency', currency: 'USD'}).format(
        state.cart.reduce((previousPrice, cartItem) => {
            return previousPrice + cartItem.price * cartItem.qty	
        }, 0)
    )

    const cart = state.cart.sort((a,b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return (itemA -itemB)
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: []
}

export const cartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement [] }

export const CartProvider = ( { children }: ChildrenType): ReactElement => {

   return (
    <cartContext.Provider value={useCartContext(initCartState)}>
        { children}
    </cartContext.Provider>
   ) 

}

export default cartContext
/**
 * de children met de { } in de CartPovider is object destruering
 */

/** [WAT IS DISPATCH] 
 * ANONIEME FUCNTIE aagemaakt door useRedcuer
 * VERWACHT in de paramter een obect verwacht van het type ReducerActionType
 * Deze functie roept intern jouw reducer aan met het huidige state en de meegegeven action, en op basis van het type in de action voert het de bijbehorende case in de reducer-functie uit om nieuwe state te genereren.
*/

