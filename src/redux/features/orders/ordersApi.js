import getBaseURL from '@/utils/baseURL'
import { createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ 
            baseUrl: `${getBaseURL()}/api/orders`,
            credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints:(builder)=>({
        createOrder: (builder.mutation)({
            query: (newOrder) => ({
                url:"/",
                method:"POST",
                body:newOrder,
                credentials:'include'
            }),

        }),
        getOrderByEmail: (builder.query)({
            query:(email)=>({
                url:`/email/${email}`
            }),
            providesTags:['Orders']
        }),
        cancelOrder:(builder.mutation)({
            query: (id) => ({
                url:`/order/${id}`,
                method:"DELETE",
                credentials:'include'
            }),
        })


    })
})


export const {useCreateOrderMutation,useGetOrderByEmailQuery,useCancelOrderMutation}=ordersApi;
export default ordersApi;