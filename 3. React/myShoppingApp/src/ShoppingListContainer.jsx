import ShoppingList from "./ShoppingList";


const ShoppingListContainer = ({items, handleCheck, handleCheck_impartive, handleDelete, isLoading, searchInput}) => {
    return (
      <>
        {items.length ? (
          <ShoppingList
            items = {items}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleCheck_impartive={handleCheck_impartive}
          />
          ) : (
            <p className="emptyShoppingList">{isLoading ? "items are loading ..." : searchInput.length ? "no matching results" : "You have a empty list"}</p>
          )}
      </>
    )
  }
  
  export default ShoppingListContainer
  