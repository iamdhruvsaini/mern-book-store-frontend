import getBaseURL from '@/utils/baseURL'
import { createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ 
            baseUrl: `${getBaseURL()}/api/books`,
            credentials: 'include',
    }),
    tagTypes: ['Books'],
    
    endpoints:(builder)=>({
        fetchAllBooks: builder.query({
            query: () => '/',
            providedTags:["Books"]
        }),

        fetchSingleBook:builder.query({
            query:(id)=>`/${id}`,
            providesTags:['Books']
        }),

        addBook: builder.mutation({
            query: (formData) => {
             
              return {
                url: '/create-book',
                method: 'POST',
                body: formData,
                // Don't set `Content-Type`; the browser will handle it when using FormData
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              };
            },
            invalidatesTags: ['Books'],
          }),
          
        UpdateBook:builder.mutation({
            query:({id,...rest})=>({
                url:`/edit/:${id}`,
                method:'PUT',
                body:rest,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json', // Set Content-Type here
                },
            }),
            invalidatesTags:['Books']
        }),

        DeleteBook:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json', // Set Content-Type here
                },
            }),
            invalidatesTags:['Books']
        })
    })
})


export const { useFetchAllBooksQuery,useFetchSingleBookQuery,useAddBookMutation,useUpdateBookMutation,useDeleteBookMutation} = booksApi;
export default booksApi