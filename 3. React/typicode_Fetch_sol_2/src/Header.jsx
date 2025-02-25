import HeaderLinks from "./HeaderLinks"

const Header = ({ headerItems, handleNavLinks }) => {
    return (
        <header className="myHeader">
            <nav className="myNav">
                <ul className="headerUL">
                    { 
                        headerItems && headerItems.length &&
                        headerItems.map((item) => (
                        <HeaderLinks 
                            key = {item.id}
                            headerItem = {item}
                            handleNavLinks={handleNavLinks}
                            
                        />
                        ))
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header