'use client'



import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../Features/auth/Slice/authSlice'
import offreSlice from '../Features/offre/Slice/offre'

export const store = configureStore({
  reducer: {
    authentification : userSlice,
    offre : offreSlice,
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

