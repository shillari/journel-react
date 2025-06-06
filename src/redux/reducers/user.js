import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    token: null,
  },
  reducers: {
    setUsername: (state, action) => {
      console.log(action.payload)
      state.username = action.payload.username;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  }
});

export const {setUsername, getUsername, setToken, getToken} = userSlice.actions;
export default userSlice.reducer;