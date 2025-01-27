import React, { useEffect, useState,useRef } from 'react'
import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination , Navigation} from 'swiper/modules';
import { useFetchAllBooksQuery } from '@/redux/features/books/booksApi';




const categories=["Choose a Genre","Business","Fiction","Horror","Adventure"];



const TopSellers = () => {

    const {data:books=[]}=useFetchAllBooksQuery();
   
    
    const [selectedCategory, setSelectedCategory]=useState("Choose a Genre");

    const filterBooks=selectedCategory==="Choose a Genre" ? books : books.filter(
        book=>book.category === selectedCategory.toLowerCase()
    )

  return (
    <div className='py-10'>
        <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
        <div className='mb-8 flex items-center'>
            <select name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 focus:outline-none rounded-md px-4 py-2' onChange={(e)=>(setSelectedCategory(e.target.value))}>
                {
                    categories.map((category,index)=>(
                        <option value={category} key={index}>{category}</option>
                    ))
                }
            </select>
        </div>

        <Swiper
        
            slidesPerView={1}
            spaceBetween={30}
            
            breakpoints={{
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            1480: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            }}
            navigation={true}
            modules={[Pagination,Navigation]}
            className="mySwiper"
        >
            
        
            { filterBooks.length > 0 && filterBooks.map((book,index)=>(
                <SwiperSlide key={index}>
                    <BookCard  key={index } book={book}/>
                </SwiperSlide>
            ))}
      </Swiper>


    </div>
  )
}

export default TopSellers