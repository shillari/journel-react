import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {isCollapse: JSON.parse(localStorage.getItem('sidebarCollapsed')) || false},
  reducers: {
    toggleSlidebar: (state) => {
      state.isCollapse = !state.isCollapse;
      localStorage.setItem('sidebarCollapsed', JSON.stringify(state.isCollapse));
    }
  }
});

export const {toggleSlidebar} = sidebarSlice.actions;
export default sidebarSlice.reducer;