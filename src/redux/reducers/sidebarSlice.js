import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {isCollapse: JSON.parse(localStorage.getItem('sidebarCollapsed')) || true},
  reducers: {
    toggleSlidebar: (state) => {
      state.isCollapse = !state.isCollapse;
      localStorage.setItem('sidebarCollapsed', JSON.stringify(state.isCollapse));
    },
    collapseSidebar: (state) => {
      state.isCollapse = true;
      localStorage.setItem('sidebarCollapsed', JSON.stringify(true));
    }
  }
});

export const {toggleSlidebar, collapseSidebar} = sidebarSlice.actions;
export default sidebarSlice.reducer;