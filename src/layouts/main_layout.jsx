import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify';    // importing ToastContainer
import 'react-toastify/dist/ReactToastify.css';     // css file for showing Toast

const main_layout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <ToastContainer/>
    </>
  )
}

export default main_layout
