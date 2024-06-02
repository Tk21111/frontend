import { apiSlice } from "../../app/api/apiSlice";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../auth/authSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/randnum/all',
        }),
        getO: builder.mutation({ //username didn't get use the func intent is not working
            query: (username) => ({
                url: '/randnum',
                method: 'GET',
                credential: 'include',
                
            }),
        }),
        GetRandnum : builder.mutation({
            query: (username) => ({ //same
                url: '/randnum/get',
                method: 'GET',
                credential : 'include'
            }),
        }),
        getWho : builder.mutation({
            query: (username) => ({ //same
                url: '/randnum/giveBy',
                method: 'GET',
                credential : 'include'
            }),
        }),
        checkDull : builder.mutation({
            query: (username) => ({ //same
                url: '/randnum/check',
                method: 'GET',
                credential : 'include'
            }),
         }),
        adminGive : builder.mutation({
            query : (username) => ({
                url: '/randnum/admincmd',
                method: 'GET',
                credential: 'include'
            })
        })
    })
});

export const { useGetUsersQuery, useGetOMutation , useGetRandnumMutation , useGetWhoMutation ,useCheckDullMutation , useAdminGiveMutation} = userApiSlice;
