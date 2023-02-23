import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentAdmin:null,
    token:null
    }

    export const counterSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        successLogin : (state,action) => {
            state.currentAdmin = action.payload.admin;
            state.token = action.payload.token;
        },
        logout:(state)=>{
            state.currentAdmin=null;
            state.token=null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { successLogin ,logout} = counterSlice.actions

export default counterSlice.reducer