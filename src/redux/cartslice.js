import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({

    name: "cart",
    initialState: {
        item: [],
        quantity:0,
    },
    reducers: {
        addCart: (state, action) => {
            state.quantity +=1
            state.item.push(action.payload)
        },

        removeCart(state, action) {
           state.quantity -=1
           const removeCartItem = state.item.filter((cart)=>cart.id !== action.payload.id)
           state.item = removeCartItem
        },

    },


})


export const { addCart, removeCart } = cartSlice.actions
export default cartSlice.reducer