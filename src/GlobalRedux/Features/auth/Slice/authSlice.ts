import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState } from '@/interfaces/auth/authentification';
import { login } from '@/api/auth/loginApi';

const initialState: UserState = {
    isAuthenticated: false,
    loading: true,
    errors: {
      message: null,
      accountLock: null,
      tooManyAttempts: null,
      internalError: null,
    },
    accessToken: null ,
    user: null,
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await login(userData);
        const data = await response.json();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logoutUser: (state) => {
        localStorage.removeItem('accessToken');
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.token;
                state.errors.message = null;
                state.user = action.payload.user;
                localStorage.setItem('accessToken', action.payload.token);
            } else {
                state.errors.message = action.payload.error;
              }
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
        });
    },
  });
  
  export const { logoutUser } = userSlice.actions;
  
  export default userSlice.reducer;
