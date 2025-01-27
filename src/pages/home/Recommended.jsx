import React from "react";
import { useState,useEffect } from 'react';


import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination , Navigation} from 'swiper/modules';
import { useFetchAllBooksQuery } from "@/redux/features/books/booksApi";


const Recommended = () => {

  const {data:books=[]}=useFetchAllBooksQuery();
  

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Recommended For You</h2>
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
            
        
            { books.length > 0 && books.map((book,index)=>(
                <SwiperSlide key={index}>
                    <BookCard  key={index } book={book}/>
                </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
