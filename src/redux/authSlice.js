import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// 🔑 Логин
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/login', { email, password });
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка логина');
    }
  }
);

// 📝 Регистрация
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/register', { name, email, password });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка регистрации');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('authToken') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: builder => {
    builder
      // 🔑 Логин
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📝 Регистрация
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
