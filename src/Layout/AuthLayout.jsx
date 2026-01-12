import { div } from 'framer-motion/client';
import React from 'react'
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
      
         <div className='max-w-10/12 mx-auto my-8'>
            <Link to="/" className="text-2xl font-bold text-[#14B8A6] flex items-center">
          <img className='w-8 h-8' src="/reportify-icon.png" alt="" />
            eportify
          </Link>
            <div className=" h-[80vh] flex items-center justify-center">
               <Outlet/>
            </div>
        </div>
      
    )
}
export default AuthLayout;