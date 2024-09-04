import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    postSelected: null,
    friends:null,
  },
  reducers: {
   
    addPost: (state, action) => {
      state.postSelected = action.payload
    },
    removePost: (state) => {
      state.postSelected = null
    },
    addFriends:(state,action) => {
        state.friends = action.payload
    }

  },
})

export const { addPost, removePost,addFriends } = userSlice.actions
export const selectPost = (state) => state.user.postSelected
export const selectFriends = (state) => state.user.friends

export default userSlice.reducer