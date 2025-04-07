import { ChangeEvent, ReactElement, memo } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
import { X } from 'lucide-react';

type PropsType = {
    item: CartItemType,
    dispatch: React.ActionDispatch<[action: ReducerAction]>,
    REDUCER_ACTIONS: ReducerActionType

}
const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS}: PropsType) => {
    const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

    const lineTotal: number = (item.qty * item.price)
    const highestQty: number = 20 > item.qty ? 20 : item.qty
    const optionValues: number[] = [ ...Array(highestQty).keys()].map(integer => integer + 1)

    const options: ReactElement[] = optionValues.map(val => {
        return(
            <option key={`opt${val}`} value={val}>
                {val}
            </option>
        )
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: { ...item, qty: Number(e.target.value)}
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item, 
    })

    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price Per Item">{new Intl.NumberFormat('en-Us', {style: 'currency', currency: 'USD'}).format(item.price)}</div>
            <label htmlFor="itemQty" className="offscreeen">ItemQty</label>
            <select 
                name="itemQty" 
                id="itemQty"
                className="cart__select"
                value={item.qty}
                aria-label="item Quantity"
                onChange={onChangeQty}
                >{options}
            </select>
            <div 
                className="cart__item-subtotal"
                aria-label="Line item Subtota"
                >{Intl.NumberFormat('en-Us', {style: 'currency', currency: 'USD'}).format(lineTotal)}
            </div>
                <button 
                    className="cart__button"
                    aria-label="Remove Item from Cart"
                    title="Remove item from Cart"
                    onClick={onRemoveFromCart}

                ><X className="w-2 h-2"/>
            </button>
        
        </li>
    )

  return content
}

function areItemsEqual({ item: prevItem}: PropsType, {item: nexItem}: PropsType) {
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nexItem[key as keyof CartItemType]
    })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)


export default MemoizedCartLineItem