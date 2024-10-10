
import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from "react-helmet";




export default function ProductDetails() {
  let params = useParams();

  // Function to fetch product details based on ID
  async function getProductDetails(id) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return data;
  }

  // Fetch product details with react-query
  const { isLoading, error, data } = useQuery(['getProductDetails', params.id], () => getProductDetails(params.id));

  if (isLoading) {
    return <div className="text-center my-5"><h3>Loading...</h3></div>;
  }

  if (error) {
    return <div className="text-center text-danger my-5"><h3>Failed to load product details!</h3></div>;
  }

  const product = data?.data;

  return (
    <>
    <Helmet>
      <title>{product.title}</title>
    </Helmet>
    <div className="container my-5">
      <h1 className="text-center mb-4">{product.title}</h1>
      
      {/* Product details row */}
      <div className="row">
        {/* Product Cover Image */}
        <div className="col-md-6">
          <img src={product.imageCover} alt={product.title} className="img-fluid rounded mb-4" />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h2 className="text-primary">Price: ${product.price}</h2>
          <p className="lead">{product.description}</p>
          <p><strong>Sold:</strong> {product.sold}</p>
          <p><strong>Quantity in stock:</strong> {product.quantity}</p>
          <p><strong>Average Rating:</strong> {product.ratingsAverage} ({product.ratingsQuantity} ratings)</p>
          <button className=" btn w-100 text-white " style={{ backgroundColor: 'green' }}> Add to cart</button>


        </div>
       
      </div>

      {/* Product Additional Images */}
      <div className="row mt-4">
        <h3 className="text-center">More Images</h3>
        <div className="d-flex justify-content-center">
  {product?.images?.length > 0 ? (
    product.images.map((image, index) => (
      <img 
        key={index}
        src={image}
        alt={`Product Image ${index + 1}`}
        className="img-thumbnail mx-2"
        style={{ width: '150px', height: 'auto' }}
      />
      
    ))
  ) : (
    <p>No additional images available</p>
  )}
</div>

      </div>

      {/* Category and Brand Info */}
      <div className="row mt-5 d-flex" >
        <div className="col-md-6">
          <h5><strong>Category:</strong> {product.category.name}</h5>
        </div>
        <div className="col-md-6">
          <h5><strong>Brand:</strong> {product.brand.name}</h5>
          <img
            src={product.brand.image}
            alt={product.brand.name}
            className="img-fluid"
            // style={{ width: '100px' }}
          />
        </div>
      </div>
    </div>
    </> );
}

