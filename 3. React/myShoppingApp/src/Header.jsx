
const Header = ({title = "Default Title"}) => {
  return (
    <header className="myHeader">
        <h1 className="myHeaderH1">{title}</h1>
    </header>
  )
}


export default Header
