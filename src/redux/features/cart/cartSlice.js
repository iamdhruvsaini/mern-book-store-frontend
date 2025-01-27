import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (!existingItem) {
        state.cartItems.push(action.payload);
        Toast.fire({
          icon: 'success',
          text: "Item Added Successfully",
          color: '#32a866',
        });
      } else {
        Swal.fire({
          title: "Already Added",
          text: "You have previously added it !",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          width: "20rem"
        })
        
      }
    },
    removeFromCart(state,action){
      state.cartItems=state.cartItems.filter(item=>item._id !== action.payload._id);
    },
    clearCart(state,action){
      state.cartItems=[]
    }
  }
});

export const { addToCart,removeFromCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
