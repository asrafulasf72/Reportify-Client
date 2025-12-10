import React from 'react'
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-10/12 mx-auto'>
            <h1 className='text-4xl'>Reportify</h1>
            <div className=" h-[60vh] flex items-center justify-center">
               <Outlet/>
            </div>
        </div>
    )
}
export default AuthLayout;