import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({

    name: "cart",
    initialState: {
        item: [],
        quantity: 0,
    },
    reducers: {
        addCart: (state, action) => {
            const checking = state.item.findIndex((res) => res.id === action.payload.id);
            if (checking >= 0) {
                state.item[checking].quantity += 1
            } else {
                const temp = { ...action.payload, quantity: 1 }
                state.item.push(temp);
            }
        },

        removeCart: (state, action) => {
            const removeCartItem = state.item.filter((cart) => cart.id !== action.payload.id)
            state.item = removeCartItem;
        },
        decrement: (state, action) => {

            const decCheck = state.item.findIndex((decNumber) => decNumber.id === action.payload.id)
            if (state.item[decCheck].quantity > 1) {
                state.item[decCheck].quantity -= 1;

            } else if (state.item[decCheck].quantity === 1) {
                const remove = state.item.filter((rem) => rem.id !== action.payload.id)
                state.item = remove;
            }

        }


    },


})


export const { addCart, removeCart, decrement } = cartSlice.actions
export default cartSlice.reducer