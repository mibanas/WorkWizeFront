import { createSlice } from '@reduxjs/toolkit';
import { cookies } from 'next/headers'

type LoginResponse = {
  token: string;
  userEmail: string;
  userName: string;
  id: string;
};

const initialState: Partial<LoginResponse> = {};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const authReducer = slice.reducer;
