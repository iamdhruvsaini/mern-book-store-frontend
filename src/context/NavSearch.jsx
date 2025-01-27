import { useContext, createContext, useState } from "react";

const searchBox=createContext();

export const useSearchContex=()=>{
    return useContext(searchBox);
}



export const Searchprovide=({children})=>{
    const [itemSearched,setItemSearched]=useState('');

    return (
        <searchBox.Provider value={{itemSearched,setItemSearched}}>
            {children}
        </searchBox.Provider>
    )
}