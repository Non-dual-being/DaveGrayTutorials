import useCart from "../hooks/useCart"

type PropsType = {
     viewCart: boolean
}
const Footer = ({viewCart}: PropsType) => {
  const {totalItems, totalPrice} = useCart()
  const year: number = new Date().getFullYear()
  const FooterContent = viewCart 
    ? <p>Shopping Cart &copy; {year} </p>
    : (
      <>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <p>Shopping Cart: &copy; {year}</p>
      </>
    )

  const myFooter = (
    <footer className="footer">{FooterContent}</footer>
  )

  return myFooter
}

export default Footer