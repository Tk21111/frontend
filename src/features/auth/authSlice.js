import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user : null , token: null , roles : null , no : null},
    reducers: {
        setCredentials: (state, action) => {
            const { user , accessToken , roles , refreshToken ,no} = action.payload

            if(refreshToken){
                localStorage.setItem("refreshToken" , refreshToken);
            }
            if (user) {
                state.user = user
            } 
            if (accessToken){
                state.token = accessToken
            }
            if (roles){
                state.roles = roles
            }
            if(no){
                state.no = no
            }
            
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.roles = null
             state.no = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentRoles = (state) => state.auth.roles
export const selectCurrentNo = (state) => state.auth.no