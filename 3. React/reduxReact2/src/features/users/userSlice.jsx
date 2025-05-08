import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return [...response.data];

    /**de data komt in de payload, de type wordt users/fetchUsers/fulfilled 
     * hier spread je al de data dus je maakt al een kopie
    */
})



const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload;
                /** agian cuz of immer this works 
                 * overriding instead of making a new copy
                 */

            })
    }
})


export const selectAllUsers = (state) => state.users
export const selectUserById = (state, userId) => 
(
    state.users.find(user => String(user.id) === String(userId))
)

/**
 * zonder de {} is de return altijd impliciet
 */



export default usersSlice.reducer

/**
 * belangrijk om te weten is het spreaden van data niets met je oude state te maken heeft
 * het is om te voorkomen dat je binne gekomen dat kwa naamgeving een referentie kan zijn naar andere state objecten
 * dus als action.payload erngesn anders in je app verwijst naar een huidige staat bijvoorbeeld
 */