import { div } from 'framer-motion/client';
import React from 'react'
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
      
         <div className='max-w-10/12 mx-auto my-8'>
            <Link to='/'><h1 className='text-4xl'>Reportify</h1></Link>
            <div className=" h-[80vh] flex items-center justify-center">
               <Outlet/>
            </div>
        </div>
      
    )
}
export default AuthLayout;