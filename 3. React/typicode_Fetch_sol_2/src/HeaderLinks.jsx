const HeaderLinks = ({ headerItem, handleNavLinks }) => {
    return (
        <li
        className= {headerItem.active ? "headerLink active" : "headerLink"}
        onClick={() => handleNavLinks(headerItem.id)}
        tabIndex= "0"
        onKeyDown={(e) => e.key === "Enter" && handleNavLinks(headerItem.id)}        
        >
        {headerItem.label}
        </li>
    )
}

export default HeaderLinks