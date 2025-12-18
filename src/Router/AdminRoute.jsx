import React from 'react'
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loader from '../Component/Loader';

 const AdminRoute = ({children}) => {
    const {user, loading}=useAuth();
    const {role, roleLoading}=useRole()

    if(loading || roleLoading){
        return <Loader/>
    }

    if(role !== 'admin'){
        return <div><h1 className='text-5xl text-red-400'>Access Forbidden</h1></div>
    }
  return children
}
export default AdminRoute;