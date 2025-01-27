import Loading from '@/components/Loading';
import { useAuth } from '@/context/AuthContex'
import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {currentUser,loading}=useAuth();
    if(loading){
        return <Loading></Loading>
    }
    if (currentUser){
        return children;
    }
    return <Navigate to={"/login"} replace='true'></Navigate>
}

export default PrivateRoute