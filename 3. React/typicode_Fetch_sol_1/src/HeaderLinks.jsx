import React from 'react'

const HeaderLinks = ({headerItem, handlenavlinks}) => {
  return (
    <li 
    className = {headerItem.active ? "headerLink active" : "headerLink"}
    onClick = {() =>handlenavlinks(headerItem.id)}
    tabIndex= "0"
    onKeyDown={(e) => e.key === "Enter" && handlenavlinks(headerItem.id)}
    >
    {headerItem.label}
    </li>
  )
}

export default HeaderLinks

/**
 * *tabindex zet een element op focusbaar en voegt het toe aan de tabvolgorde
 * De && is shorthand if -statement
 */