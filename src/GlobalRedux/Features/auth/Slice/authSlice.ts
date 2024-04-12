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
    accessToken: null,
    user: null,
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await login(userData);
        console.log(response.status);
        
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
        // state.isAuthenticated = false;
        // state.tokens.accessToken = null;
        // state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          
            if (action.payload.success) {
                console.log('ok');
                console.log(action);
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.token;
                state.errors.message = null;
                state.user = action.payload.user;
            } else {
                console.log('nooo');
                console.log(action);
                state.errors.message = action.payload.error;
            }
        })
        .addCase(loginUser.rejected, (state, action) => {
            console.log('papapapap');
            console.log(action);
            state.loading = false;
            state.isAuthenticated = false;


            // state.errors.login = action.payload as string;
        });
    },
  });
  
  export const { logoutUser } = userSlice.actions;
  
  export default userSlice.reducer;
