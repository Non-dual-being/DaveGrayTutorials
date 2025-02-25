import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

const ShoppingItem = ({item, handleCheck, handleDelete, handleCheck_impartive}) => {
  return (
    <li className="item"> 
        <input 
        type="checkbox"
        checked={item.checked}
        onChange={() => {typeof(handleCheck) === "function" ? handleCheck(item.id) : handleCheck_impartive(item.id)}} /**voor je klikt is het hier tijdens de eerste render al ingesteld op handlecheck(1, 2 of 3) */
        >
        </input>
        <label
            style={(item.checked) ? { textDecoration: 'line-through'} : {fontWeight: 'bold'} }
            onDoubleClick={()=>{typeof(handleCheck) === "function" ? handleCheck(item.id) : handleCheck_impartive(item.id)}}
        >{item.item}</label>
        <FaTrashAlt 
            onClick={() => {handleDelete(item.id)}}
            role='button' 
            tabIndex='0' //focus volgorde in de dom via tab (0 is regulier)
            aria-label={`Delete ${item.item}`}
        />
    </li>
  )
}

export default ShoppingItem