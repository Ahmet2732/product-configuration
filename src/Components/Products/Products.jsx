import React, { useContext, useEffect, useState } from 'react';
import styles from './Products.module.css';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { isError, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { addtoCart, cartContext } from '../../Context/cartContext';
import { toast } from 'react-hot-toast';

<link rel="stylesheet" href="index.css" />
export default function Products() {



  
  async function AddProducttoCart(id){

   let response=await addtoCart(id)
  //  if(response.data.status==="sucsess"){
  //   toast.success("Product added to cart successfully",{
  //     duration: 3000,
  //     position: 'top-right'
  //   })
  //  }else{
  //   console.log(response);
  //  }

console.log(response);


  }





  let{addtoCart}=useContext(cartContext)
// const[product,setProduct]=useState([]) 
// const[loading,setisLoading]=useState(true)
//   async function getproduct(){
//     let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//     console.log(data);

//     setProduct(data.data)

//     setisLoading(false)
//   }
//   useEffect(()=>{
//     getproduct()
//   },[])
   function getproduct(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
     let{isLoading,isError,data ,isFetching}=useQuery('getproducts',getproduct)
     console.log(data?.data.data);
     
  return( <>
    <div className="container py-5  w-100">

    {isLoading?<div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}>
  <BallTriangle 
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
</div>
: <div className="row  ">
    
    {data?.data.data.map((ele)=>  <div key={ele.id} className="col-md-2 mx-2 ">
     
      <div className="product p-3  ">
      <Link  to={`/productdetails/${ele.id}`} className='text-decoration-none'>
      <img src={ele.imageCover} className='w-100' alt="" />
      <p className='text-main'> Category</p>
      <h3>{ele.title.slice(0,23)}</h3>
        <div className="d-flex justify-content-between">
      <p>{ele.price} EG</p>
      <i className='fa fa-star rating-color'> {ele.ratingsAverage}</i>
        </div>
        </Link>
        <button onClick={()=>AddProducttoCart(ele.id)} className="btn bg-main text-white w-100 px-1 ">add to cart</button>
      </div>
    
      
      </div>
  
    )}
    
    </div>}
     
      </div>
    
  </>)
}
