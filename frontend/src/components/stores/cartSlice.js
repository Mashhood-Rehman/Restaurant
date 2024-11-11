import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.items.findIndex(item => item._id === action.payload._id)
            if (index >= 0) {
                state.items[index].quantity += 1
            } else {
                const newItem = { ...action.payload, quantity: 1 }
                state.items.push(newItem)
            }
            state.totalQuantity += 1
            state.totalAmount += action.payload.price
        },
        removeFromCart: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload)
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity
                state.totalAmount -= existingItem.price * existingItem.quantity
                state.items = state.items.filter(item => item._id !== action.payload)
            }
        },
  
        incrementQuantity: (state, action) => {
            const index = state.items.findIndex(item => item._id === action.payload._id)
            if (index >= 0) {
                state.items[index].quantity += 1
                state.totalQuantity += 1
                state.totalAmount += action.payload.price
            }
        },
        decrementQuantity: (state, action) => {
            const index = state.items.findIndex(item => item._id === action.payload._id)
            if (index >= 0) {
                if (state.items[index].quantity > 1) {
                    state.items[index].quantity -= 1 
                    state.totalQuantity -= 1
                    state.totalAmount -= action.payload.price
                }    else {
                    state.totalAmount -= action.payload.price
                    state.totalQuantity -= 1
                    state.items.splice(index, 1)
                }
            }
        }
    }
})

export const { addToCart, removeFromCart, changeQuantity, incrementQuantity, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer



