import Loading from '@/components/Loading';
import { useFetchAllBooksQuery } from '@/redux/features/books/booksApi'
import React from 'react'
import BookCard from '../books/BookCard';
import { useSearchContex } from '@/context/NavSearch';

const Search = () => {
  const {data:books,isError,isLoading}=useFetchAllBooksQuery();
  const {itemSearched}=useSearchContex();
  if(isLoading){
    return(
      <Loading></Loading>
    )
  }
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(itemSearched.toLowerCase())
  );
 
  return (
    <div className='grid min-[900px]:grid-cols-2 gap-2 p-2'>
        {filteredBooks.map((book)=>(
          <BookCard book={book} key={book._id}></BookCard>
        ))}
    
      

    </div>
  )
}

export default Search