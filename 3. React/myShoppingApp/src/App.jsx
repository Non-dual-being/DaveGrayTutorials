import Header from './Header';
import AddShoppingItem from './AddShoppingItem';
import SearchItem from './SearchShoppingItem';
import ShoppingListContainer  from './ShoppingListContainer';
import apiRequest from './shoppingAPI';
import Footer from './Footer';

import { useState, useEffect } from 'react';

const App = () => {
  const mainTitle = "Shopping List App"
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsloading] = useState(true);
    
    /**declaratieve manier van schrijven, je scrijf wat je wilt zien */
  
  const handleCheck = (id) => {
      const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked } : item)
  
      setItems(listItems);
      localStorage.setItem('shoppinglist', JSON.stringify(listItems));
        
    }
  /**wat meer impartief, dus lijn voor lijn manier van schrijf zou als volgt zijn  */
  
  const handleCheck_impartive = (id) => {
    setItems((prevItems) => {
      const updateItems = [...prevItems]; //list of items which are objects
  
      const index = updateItems.findIndex((item) => item.id === id);
  
      if (index !== -1) {
        updateItems[index] = {
          ...updateItems[index],
          checked: !updateItems[index].checked
  
        };
      }
  
      return updateItems; //this within the setItems
  
    })
  }
  
  const handleDelete = async (id) => {
    const listItems = items.filter(item => item.id !== id);
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems)); // ✅ Update LocalStorage
  
    /** Probeer het ook op de server te verwijderen */
    try {
      const deleteOptions = {
        method: "DELETE"
      };
      await apiRequest(`${API_URL}/${id}`, deleteOptions);
    } catch (e) {
      console.warn("Failed to delete from server, but removed from LocalStorage:", e.message);
    }
  };
  

  //async becauze of the fetch api

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem) return;
    
    let newID;
    if (items && items.length){
      newID = Math.max(...items.map(item => item.id)) + 1;
    } else { newID = 1};

    const newItemToSever = {
      id: newID,
      checked: false,
      item: newItem
    }

    setItems((prevItems) => {
      const addNewItems = [...prevItems, newItemToSever];
      localStorage.setItem('shoppinglist', JSON.stringify(addNewItems));
      return addNewItems;
    });

    setNewItem('');
 
    /**updating the api items in the server  */
    const postOptions = {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json' 
      },
      body: JSON.stringify(newItemToSever)
    }
    const result = await apiRequest(API_URL, postOptions);

    //there wil be a result if a error message showed up in the catch block
    //if (result) {setFetchError(result)}; om de local te laten werken
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected Data');
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
        localStorage.setItem('shoppinglist', JSON.stringify(listItems)); // ✅ Save to LocalStorage
      } catch (e) {
        const storedItems = localStorage.getItem('shoppinglist');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        } else {
          setItems([]); // Geen data, zet een lege lijst
      }

      } finally {
        setIsloading(false);
      }
    }
    //simulating a api fetch, but is a local server
    setTimeout(() => {
      (async () => await fetchItems ())();
    }, 1000)
   

  }, []);

  return (
    <div className="myShoppingApp">
      <Header title={mainTitle}/>
      <AddShoppingItem
      handleSubmit = {handleSubmit}
      newItem = {newItem}
      setNewItem = {setNewItem}
      >
      </AddShoppingItem>
      <SearchItem
      search = {searchInput}
      setSearchInput = {setSearchInput}
      > 
      </SearchItem>
      <main className='myMain'>
      {fetchError 
        ? (<p className="fetchError">{`Error: ${fetchError}`}</p>) 
        :
        (
        <ShoppingListContainer
          items = {items.filter(
            item => ((item.item).toLowerCase().includes(searchInput.toLocaleLowerCase()))
          )}
          handleCheck = {handleCheck}
          handleCheck_impartive = {handleCheck_impartive}
          handleDelete = {handleDelete}
          isLoading = {isLoading}
          searchInput = {searchInput}
        />
        )
      }

      </main>
      <Footer length = {items.length}/>
    </div>
  )
}

export default App
