import {createBrowserRouter} from 'react-router-dom'
import App from '../App';
import Home from '@/pages/home/Home';
import LoginPage from '@/components/LoginPage';
import SignupPage from '@/components/SignupPage';
import CartPage from '@/pages/books/CartPage';
import CheckOut from '@/pages/books/CheckOut';
import SingleBook from '@/pages/books/SingleBook';
import PrivateRoute from './PrivateRoute';
import OrderPage from '@/pages/books/OrderPage';
import AdminRoutes from './AdminRoutes';
import AdminLogin from '@/components/AdminLogin';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import Dashboard from '@/pages/dashboard/Dashboard';
import ManageBooks from '@/pages/dashboard/manageBooks/ManageBooks';
import AddBook from '@/pages/dashboard/addBooks/AddBook';
import UpdateBook from '@/pages/dashboard/editBook/UpdateBook';
import PageNotFound from '@/components/PageNotFound';
import Contact from '@/pages/contact/Contact';
import Search from '@/pages/search/Search';

const router=createBrowserRouter([
    {
        path:"/",
        element : <App/>,
        children:[
            {
                path:"/",
                element: <Home/>

            },
            {
                path:"/login",
                element:<LoginPage/>
            },
            {
                path:"/signup",
                element:<SignupPage/>
            },
            {
                path:"/order",
                element: <PrivateRoute><OrderPage/></PrivateRoute>

            },
            {
                path:"/cart",
                element: <CartPage/>

            },
            {
                path:"/checkout",
                element: <PrivateRoute><CheckOut/></PrivateRoute>

            },
            {
                path:"/books/:id",
                element:<SingleBook/>
            },
            {
                path:"/admin",
                element:<AdminLogin/>
            },
            {
                path:"/contact",
                element: <PrivateRoute><Contact/></PrivateRoute>
            },
            {
                path:"/search",
                element:<Search/>
            }

        ]

    },


    {
        path:"/dashboard",
        element: <AdminRoutes><DashboardLayout/></AdminRoutes> ,
        children:[
        {
            path:"",
            element:<AdminRoutes><Dashboard/></AdminRoutes> 
        },
        {
            path:"add-new-book",
            element:<AdminRoutes><AddBook/></AdminRoutes> 
        },
        {
            path:"edit-book/:id",
            element:<AdminRoutes><UpdateBook></UpdateBook></AdminRoutes> 
        },
        {
            path:"manage-books",
            element:<AdminRoutes><ManageBooks/></AdminRoutes> 
        }
    ]
    },
    {
        path:'*',
        element:<PageNotFound/>
    }
])

export default router;