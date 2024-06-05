import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InfoAccountPut, LoginResponse, UserType } from '@/@types/user'

// import http from '@/utils/http';

interface AuthState {
  user: UserType | null
  accessToken: string | null
  refreshToken: string | null
  role: string | null
}
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  role: null
}

// create thunk

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserLogin: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.role = action.payload.role
    },
    saveLogout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.role = null
    },
    saveInfoUserUpdate: (state, action: PayloadAction<InfoAccountPut>) => {
      if (state.user) {
        state.user.avatarUrl = action.payload.avatarUrl
        state.user.email = action.payload.email
      }
    }
  }
  // extraReducers: (builder) => {},
})
export const { saveUserLogin, saveLogout, saveInfoUserUpdate } = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer
