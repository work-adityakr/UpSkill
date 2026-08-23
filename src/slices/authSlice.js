import { createSlice } from "@reduxjs/toolkit";
 
const getSafeToken = () => {
  const rawToken = localStorage.getItem("token");
  if (!rawToken) return null;
  try {
    return JSON.parse(rawToken);
  } catch (error) {
    return rawToken;
  }
};

const initialState = {
  signupData: null,
  loading: false,
  token: getSafeToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
