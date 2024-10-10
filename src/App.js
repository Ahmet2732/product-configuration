import './App.css';
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import LoginForm from './Components/Login/Login'; // Correct if default export
import UserContextProvider from './Context/userContext';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import NotFound from './Components/notFound/notFound';
import CartContextProvider from './Context/cartContext';
import { Toaster } from 'react-hot-toast';



let routes = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<Home/>},
    {path:'Products' , element:<Products/>},
    {path:'Cart' , element:<Cart/>},
    {path:'Categories' , element:<Categories/>},
    {path:'Brands' , element:<Brands/>},
    {path:'Login' , element:<Login/>},
    {path:'Register' , element:<Register/>},
    {path:'loginForm',element:<LoginForm/>},
    {path:"productdetails/:id",element:<ProductDetails/>},
    {path:"*",element:<NotFound/>}


  ] }
])

function App() {

  return  <CartContextProvider> <UserContextProvider> 
    <RouterProvider router={routes}></RouterProvider>
    </UserContextProvider>
    <Toaster/>
    </CartContextProvider>  
}

export default App;




