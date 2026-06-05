import { createSlice } from "@reduxjs/toolkit";

//  merr user nga localStorage (kur refresh app)
const userFromStorage = JSON.parse(localStorage.getItem("user"));

const initialState = userFromStorage ? userFromStorage : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    //  SET USER (login/register)
    setUser: (state, action) => {
      return action.payload;
    },

    //  LOGOUT
    logoutUser: (state) => {
      localStorage.removeItem("user");
      return null;
    },
  },
});

//  export actions
export const { setUser, logoutUser } = userSlice.actions;

//  export reducer
export default userSlice.reducer;