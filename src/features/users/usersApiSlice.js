import { apiSlice } from "../../app/api/apiSlice";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../auth/authSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/randnum/all',
        }),
        getO: builder.mutation({ //username didn't get use the func intent is not working
            query: () => ({
                url: '/randnum/get',
                method: 'GET',
                credential: 'include',
                
            }),
        }),
        SetRanNum : builder.mutation({
            query: () => ({ //same
                url: '/randnum/set',
                method: 'GET',
                credential : 'include'
            }),
        }),
        getWho : builder.mutation({
            query: () => ({ //same
                url: '/randnum/giveBy',
                method: 'GET',
                credential : 'include'
            }),
        }),
        checkDull : builder.mutation({
            query: () => ({ //same
                url: '/randnum/check',
                method: 'GET',
                credential : 'include'
            }),
         }),
        adminGive : builder.mutation({
            query : () => ({
                url: '/randnum/admincmd',
                method: 'GET',
                credential: 'include'
            })
        }),
        adminReset : builder.mutation({
            query : ()=> ({
                url : '/randnum/reset',
                method : "GET",
                credential : 'include'
            })
        })
    })
});

export const { useGetUsersQuery, useGetOMutation , useSetRanNumMutation , useGetWhoMutation ,useCheckDullMutation , useAdminGiveMutation , useAdminResetMutation} = userApiSlice;
