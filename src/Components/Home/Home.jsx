import React from 'react';
import styles from './Home.module.css';
import Products from '../Products/Products';

export default function Home() {
  return <>
    <h1>Home</h1>
    <button className='btn bg-main text-white'>Hi</button>
    <Products/>
  </>
}
