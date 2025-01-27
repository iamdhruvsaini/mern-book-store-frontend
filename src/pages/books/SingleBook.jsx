import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import {} from 'react-dom'
import { useParams } from "react-router-dom";
import { useFetchSingleBookQuery } from "@/redux/features/books/booksApi";
import { getImgUrl } from "@/utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import Loading from "@/components/Loading";

const SingleBook = () => {


    const {id}=useParams();
    const  {data:book,isLoading,isError}=useFetchSingleBookQuery(id);
    
    const dispatch=useDispatch();

    const handleToCart=()=>{
        dispatch(addToCart(book));
    }

    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <div>
        Error Happening in Loading Information ...
    </div>
    }


  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

      <div>
        <div>
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="mb-8"
          />
        </div>

        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book.author || "admin"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Published:</strong>{" "}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {book.description}
          </p>
        </div>
      </div>

      <button
        onClick={() => handleToCart(book)}
        className="btn-primary px-6 space-x-1 flex items-center gap-1"
      >
        <FiShoppingCart className="" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default SingleBook;
