import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { Offline, Online } from 'react-detect-offline';
export default function Layout() {
  return <>
  <Navbar/>
<div className="container">
<Outlet></Outlet>
</div>
<div>
    <Offline><div className="network">
      <i className='fa fa-wifi'> you are now oofline plz connect your device</i>
      </div></Offline>
  </div>

  </>
}
