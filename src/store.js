import { createSlice, configureStore } from '@reduxjs/toolkit'
import user from './store/userSlice'
import cart from './store/cartSlice'

export let {changeName, increase} = user.actions // 오른쪽 자료를 변수로 빼는 문법
export let {addCount, addItem} = cart.actions

export default configureStore({
  reducer: { 
    user: user.reducer, // 작명: 위에 만든 state.reducer
    cart: cart.reducer
   }
}) 