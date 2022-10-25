import { createSlice, configureStore } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',//'state 이름~',
  initialState: { name : 'baek', age : 20 }, // '값'
  reducers: { // state 수정 함수
    changeName(state){
      state.name = 'kim'
    },
    increase(state,a){
      state.age += a.payload
    }
  }
})

export default user