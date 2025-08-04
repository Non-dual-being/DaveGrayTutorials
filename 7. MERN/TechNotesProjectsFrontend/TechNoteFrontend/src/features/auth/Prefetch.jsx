import { store } from '../../app/Store'
import { NotesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing');
    const notes = store.dispatch(NotesApiSlice.endpoints.getNotes.initiate())
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      console.log('unsubscribing')
      notes.unsubscribe();
      users.unsubscribe();
    }

  }, [])
  return <Outlet />
}

export default Prefetch

/**
 * empty depency array, only run when the components mount, so data will render after a user routes to a proteced page 
 * manual subscription to notes and users (get)
 * The manual subscription is getting the data and combining it with a subssciption
 * unsubscripting when leaving the proteced page\
 * the outlet  are the children
 * 
 * 
 */