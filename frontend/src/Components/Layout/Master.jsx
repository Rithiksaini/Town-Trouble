import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Master() {
  return (
    <>
   <Header/>
        <div style={{minHeight:"90vh"}}>
            <Outlet/>
        </div>
        <Footer/>
        </>
  );
}

export default Master