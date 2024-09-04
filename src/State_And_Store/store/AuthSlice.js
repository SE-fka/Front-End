import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_authenticated: false,
    access_token: "",
    refresh_token: "",
    user: {id:"", user_name:'', first_name:"", last_name:"", email:''},
    error: "",
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LOGIN_SUCCESS:(state, action)=>{
            state.is_authenticated = true;
            state.user.user_name = action.payload.user.user_name;
            state.user.first_name = action.payload.user.first_name;
            state.user.last_name = action.payload.user.last_name;
            state.user.email = action.payload.user.email;
            state.user.id = action.payload.user.id;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.error = "";
        },
        LOGIN_FAILED:(state, action)=>{
            state.is_authenticated = false;
            state.error = action.payload.message; 
        },
        LOGOUT_SUCCESS:(state, action)=>{
            state.is_authenticated = false;
            state.user = {};
            state.error = "";
            state.refresh_token="";
            state.access_token="";
        },
    },
})

export const {LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS, SET_TOKEN} = AuthSlice.actions;

export default AuthSlice.reducer;