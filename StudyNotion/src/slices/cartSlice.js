import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'

const initialState = {
    cart: localStorage.getItem("cart") ?
        JSON.parse(localStorage.getItem("cart")) : [],

    totalItems: localStorage.getItem("totalItems") ?
        JSON.parse(localStorage.getItem("totalItems")) : 0,

    total: localStorage.getItem("total") ?
        JSON.parse(localStorage.getItem("total")) : 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:
    {
        addToCart: (state, action) => {
            console.log("course", action.payload)
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)
        
            if (index>=0) {
                toast.error("course allready in cart")
               return;
            }
            state.cart.push(course);
            state.totalItems = state.totalItems + 1;
            state.total=  state.total + course.price;


            // update to localStorage

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            // show toast
            toast.success("Course added scuccessfully.,")
        }
        ,
        removeFromCart: (state, action) => {
            const courseId = action.payload
            console.log("id", courseId)
            const index = state.cart.findIndex((item) => item._id === courseId)
     
            console.log("index", index)
            if (index>=0) {
                // if the course found in the cart then remove it 

                state.totalItems = state.totalItems - 1;
                state.total -=state.cart[index].price;
                state.cart = state.cart.splice(index, 1);

                // update to localStorage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                toast.success("course removed from cart.,");

            }

        }
        ,
        resetCart(state, value) {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            //update localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("toatl", JSON.stringify(state.total));
            localStorage.setItem("toatItems", JSON.stringify(state.totalItems))
        },

    }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;