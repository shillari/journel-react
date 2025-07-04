import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: null,
    token: null,
    email: null,
    photo: null
  },
  reducers: {
    setUsername: (state, action) => {
      console.log(action.payload)
      state.username = action.payload.username;
    },
    setToken: (state, action) => {
      state.token = "Bearer " + action.payload.token;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setId: (state, action) => {
      state.id = action.payload.id;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload.photoUrl;
    },
  }
});

export const {setUsername, getUsername, setToken, getToken, setEmail, getEmail, setId, getId, setPhoto, getPhoto} = userSlice.actions;
export default userSlice.reducer;